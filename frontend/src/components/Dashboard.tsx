import { Header } from "./Header"
import { Menu } from "./Menu"
import Chart from "react-apexcharts";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { ApexOptions } from "apexcharts";

interface InfoProductsType {
    productsstorage: number
    productsamountstorage: number
    productspricestorage: number
}

interface InfoProductsChartType {
    name: string
    amount: number
    price: number
}

export const Dashboard = () => {

    const [infoProducts, setInfoProducts] = useState<InfoProductsType[]>([{
        productsstorage: 0,
        productsamountstorage: 0,
        productspricestorage: 0
    }])

    const [infoProductsChart, setInfoProductsChart] = useState<InfoProductsChartType[]>([{
        name: "",
        amount: 0,
        price: 0
    }])

    const productsInfoStorage = async () => {
        const fetch = await api.get("/dashboard/products_storage")
        const response = fetch.data
        setInfoProducts(response)
    }

    const productsInfoStorageChart = async () => {
        const fetch = await api.get("/dashboard/products_chart")
        const response = fetch.data
        setInfoProductsChart(response)
    }

    const productsAmountChart: ApexOptions = {
        series: infoProductsChart.map(product => product.amount),
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: infoProductsChart.map(product => product.name),
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const productsPriceChart: ApexOptions = {
        series: infoProductsChart.map(product => product.price),
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: infoProductsChart.map(product => product.name),
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    useEffect(() => {
        productsInfoStorage()
        productsInfoStorageChart()
    }, [])

    return (
        <>
            <Header />
            <div className="flex">
                <div className="w-100">
                    <Menu />
                </div>
                <div className="w-full p-10">
                    <h1 className="font-medium text-3xl">Dashboard</h1>
                    <div className="flex gap-10 max-[1024px]:gap-20 max-[768px]:gap-10 transition-all">
                        <div className="bg-white w-[32%] rounded-lg mt-12 transition-all duration-500 hover:scale-105 hover:shadow-lg">
                            <h1 className="px-3 py-2 text-gray-600 text-bold text-lg text font-semibold">Total de produtos em estoque</h1>
                            <hr />
                            <h1 className="px-3 py-5 text-center text-black text-3xl font-semibold">{infoProducts[0].productsstorage}</h1>
                        </div>
                        <div className="bg-white w-[32%] rounded-lg mt-12 transition-all duration-500 hover:scale-105 hover:shadow-lg">
                            <h1 className="px-3 py-2 text-gray-600 text-lg text font-semibold">Total em R$</h1>
                            <hr />
                            <h1 className="px-3 py-5 text-center text-black text-3xl font-semibold">{infoProducts[0].productspricestorage},00</h1>
                        </div>
                        <div className="bg-white w-[32%] rounded-lg mt-12 transition-all duration-500 hover:scale-105 hover:shadow-lg">
                            <h1 className="px-3 py-2 text-gray-600 text-lg text font-semibold">Total de produtos em estoque: <br /> (em quantidade)</h1>
                            <hr />
                            <h1 className="px-3 py-5 flex justify-center text-black text-3xl text font-semibold">{infoProducts[0].productsamountstorage}</h1>
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <div className="bg-white rounded-lg mt-12 transition-all duration-500 w-1/2">
                            <h1 className="px-3 py-2 text-gray-600 text-bold text-lg text font-semibold">Produtos por quantidade</h1>
                            <hr />
                            <div className="flex justify-center">
                                <Chart className="py-4" options={productsAmountChart} series={productsAmountChart.series} type="pie" width={380} />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg mt-12 transition-all duration-500 w-1/2">
                            <h1 className="px-3 py-2 text-gray-600 text-bold text-lg text font-semibold">Produtos por preço</h1>
                            <hr />
                            <div className="flex justify-center">
                                <Chart className="py-4" options={productsPriceChart} series={productsPriceChart.series} type="pie" width={380} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
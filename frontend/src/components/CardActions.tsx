import boxIcon from "../assets/logo.png"
import * as Dialog from '@radix-ui/react-dialog'
import { MdClose } from "react-icons/md"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface CardActionsProps {
    title: string
    description: string
    buttonTitle: string
}

interface FormDataType {
    name: string
    description?: string
    producer?: string
    price?: number
}

interface ApiDataType {
    id: number
    created_at: Date
    amount?: number
    producer: string
    name: string
}


export const CardActions = (props: CardActionsProps) => {
    const [dataApi, setDataApi] = useState<ApiDataType[]>()
    const [deleteIdData, setDeleteIdData] = useState<number>()
    const [removeAmountIdData, setRemoveAmountIdData] = useState<number>()
    const [removeAmountData, setRemoveAmountData] = useState<number>()
    const [addAmountIdData, setAddAmountIdData] = useState<number>()
    const [addAmountData, setAddAmountData] = useState<number>()
    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        description: "",
        producer: "",
        price: 0
    })

    const notifySuccess = () => {
        toast.success('Ação realizada com sucesso!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    const handleFetchAPI = async () => {
        const fetch = await api.get("/products")
        const response = fetch.data
        setDataApi(response);
    }

    const handleChangeFormData = (e: any) => {
        e.preventDefault()

        setFormData({...formData,
            [e.target.name] : e.target.value
        })
    }

    const handleCreateProduct = async (e: any) => {
        e.preventDefault()
        await api.post("/products", formData)
    }

    const handleDeleteProduct = async (id: number | undefined, e: any) => {
        e.preventDefault()
        await api.delete(`/products/${id}`)
    }

    const handleRemoveAmountProduct = async (id: number | undefined, e: any) => {
        e.preventDefault()
        await api.put(`/products/remove/${id}`, {
            amount: removeAmountData
        })
    }

    const handleAddAmountProduct = async (id: number | undefined, e: any) => {
        e.preventDefault()
        await api.put(`/products/add/${id}`, {
            amount: addAmountData
        })
    }

    useEffect(() => {
        handleFetchAPI()
        //console.log(dataApi)
    }, [dataApi])

    return (
        <div className="bg-white rounded-lg mt-12 shadow-lg">
            <h1 className="px-3 py-2 text-gray-600 text-bold text-lg text font-semibold">{props.title}</h1>
            <hr />
            <div className="py-3 px-5 flex gap-5 items-center">
                <img src={boxIcon} alt="Entrada no estoque" width={50} />
                <hr />
                <p className="text-base font-semibold">{props.description}</p>
            </div>
            <hr />
            {props.title === "Cadastrar produto" &&
                <>
                    <Dialog.Root>
                        <div className="flex justify-center py-3">
                            <Dialog.Trigger className="bg-blue-500 mt-1 py-2 px-5 rounded-lg text-white transition-all hover:brightness-110">
                                {props.buttonTitle}
                            </Dialog.Trigger>
                        </div>
                        <Dialog.Portal>
                            <Dialog.Overlay className="w-screen h-screen bg-black/70 fixed inset-0" />
                            <Dialog.Content className="absolute p-8 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title className="font-medium text-xl">
                                        Cadastrar produto
                                    </Dialog.Title>

                                    <Dialog.Close className="hover:scale-110 transition-transform">
                                        <MdClose size={25} />
                                    </Dialog.Close>
                                </div>

                                <form className="mt-12" onSubmit={handleCreateProduct} autoComplete="off">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" id="itemName" name="name" onChange={handleChangeFormData} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="itemName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nome</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group mt-5">
                                        <input type="text" id="itemDescription" name="description" onChange={handleChangeFormData} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="itemDescription" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Descrição (Opcional)</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group mt-5">
                                        <input type="text" id="itemProducer" name="producer" onChange={handleChangeFormData} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="itemProducer" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Fabricante (Opcional)</label>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group mt-5">
                                        <input type="number" id="itemPrice" name="price" onChange={handleChangeFormData} className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                        <label htmlFor="itemPrice" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Preço (Opcional)</label>
                                    </div>
                                    
                                    <button type="submit" onClick={notifySuccess} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
                                </form>
                                
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </>
            }
            {props.title === "Saída do estoque" &&
                <>
                    <Dialog.Root>
                        <div className="flex justify-center py-3">
                            <Dialog.Trigger className="bg-blue-500 mt-1 py-2 px-5 rounded-lg text-white transition-all hover:brightness-110">
                                {props.buttonTitle}
                            </Dialog.Trigger>
                        </div>
                        <Dialog.Portal>
                            <Dialog.Overlay className="w-screen h-screen bg-black/70 fixed inset-0" />
                            <Dialog.Content className="absolute p-8 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title className="font-medium text-xl">
                                        Saída do estoque
                                    </Dialog.Title>

                                    <Dialog.Close className="hover:scale-110 transition-transform">
                                        <MdClose size={25} />
                                    </Dialog.Close>
                                </div>

                                <form className="mt-12" onSubmit={(e) => handleRemoveAmountProduct(removeAmountIdData, e)}>
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="itemName" className="text-gray-500 leading-tight text-sm" onClick={() => console.log(removeAmountIdData)}>Nome do item</label>
                                        <select id="itemName" value={removeAmountIdData} onChange={(e) => setRemoveAmountIdData(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option>Escolha um item que deseja realizar a retirada</option>
                                            {dataApi?.map((data) => (
                                                <option key={data.id} value={data.id}>{data.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group mt-5">
                                        <input onChange={(e) => setRemoveAmountData(parseInt(e.target.value))} type="number" id="itemAmount" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="itemAmount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantidade</label>
                                    </div>
                                    <button type="submit" onClick={notifySuccess} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Realizar saída</button>
                                </form>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </>
            }
            {props.title === "Entrada no estoque" &&
                <>
                    <Dialog.Root>
                        <div className="flex justify-center py-3">
                            <Dialog.Trigger className="bg-blue-500 mt-1 py-2 px-5 rounded-lg text-white transition-all hover:brightness-110">
                                {props.buttonTitle}
                            </Dialog.Trigger>
                        </div>
                        <Dialog.Portal>
                            <Dialog.Overlay className="w-screen h-screen bg-black/70 fixed inset-0" />
                            <Dialog.Content className="absolute p-8 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <div className="flex items-center justify-between">
                                    <Dialog.Title className="font-medium text-xl">
                                        Entrada no estoque
                                    </Dialog.Title>

                                    <Dialog.Close className="hover:scale-110 transition-transform">
                                        <MdClose size={25} />
                                    </Dialog.Close>
                                </div>

                                <form className="mt-12" onSubmit={(e) => handleAddAmountProduct(addAmountIdData, e)}>
                                    <div className="flex flex-col gap-3">
                                        <label htmlFor="itemName" className="text-gray-500 leading-tight text-sm">Nome do item</label>
                                        <select value={addAmountIdData} onChange={(e) => setAddAmountIdData(parseInt(e.target.value))} id="itemName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                            <option>Escolha um item que deseja realizar a entrada</option>
                                            {dataApi?.map((data) => (
                                                <option key={data.id} value={data.id}>{data.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="relative z-0 w-full mb-6 group mt-5">
                                        <input onChange={(e) => setAddAmountData(parseInt(e.target.value))} type="number" id="itemAmount" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label htmlFor="itemAmount" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Quantidade</label>
                                    </div>
                                    <button type="submit" onClick={notifySuccess} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Realizar entrada</button>
                                </form>
                            </Dialog.Content>
                        </Dialog.Portal>
                    </Dialog.Root>
                </>
            }
            {props.title === "Excluir produto" &&
                <Dialog.Root>
                    <div className="flex justify-center py-3">
                        <Dialog.Trigger className="bg-blue-500 mt-1 py-2 px-5 rounded-lg text-white transition-all hover:brightness-110">
                            {props.buttonTitle}
                        </Dialog.Trigger>
                    </div>
                    <Dialog.Portal>
                        <Dialog.Overlay className="w-screen h-screen bg-black/70 fixed inset-0" />
                        <Dialog.Content className="absolute p-8 bg-white rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex items-center justify-between">
                                <Dialog.Title className="font-medium text-xl">
                                    Excluir produto
                                </Dialog.Title>

                                <Dialog.Close className="hover:scale-110 transition-transform">
                                    <MdClose size={25} />
                                </Dialog.Close>
                            </div>

                            <form className="mt-12" onSubmit={(e) => handleDeleteProduct(deleteIdData, e)}>
                                <div className="flex flex-col gap-3">
                                    <label htmlFor="itemName" className="text-gray-500 leading-tight text-sm">Nome do item</label>
                                    <select id="itemName" value={deleteIdData} onChange={(e) => setDeleteIdData(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option>Escolha um item que deseja realizar a exclusão</option>
                                        {dataApi?.map((data) => (
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <button type="submit" onClick={notifySuccess} className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Excluir</button>
                            </form>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            }
        </div>
    )
}
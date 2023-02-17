import { Header } from "./Header"
import { Menu } from "./Menu"
import { CardActions } from "./CardActions"
import { ToastContainer } from 'react-toastify'

export const Actions = () => {

    return (
        <div>
            <Header />
            <div className="flex">
                <div className="w-100">
                    <Menu />
                </div>
                <div className="content p-10">
                    <h1 className="font-medium text-3xl">Ações</h1>
                    <div className="flex gap-10 max-[1024px]:flex-col transition-all">
                        <CardActions 
                            title="Entrada no estoque"
                            description='Utilize esta função para realizar a entrada de um item no estoque. Esta função irá gerar dados que serão exibidos nos gráficos na aba "Dashboard".' 
                            buttonTitle="Realizar entrada"
                        />

                        <CardActions 
                            title="Saída do estoque"
                            description='Utilize esta função para realizar a saída de um item no estoque. Esta função irá gerar dados que serão exibidos nos gráficos na aba "Dashboard".' 
                            buttonTitle="Realizar saída"
                        />
                    </div>
                    <div className="flex gap-10 max-[1024px]:flex-col transition-all">
                        <CardActions 
                            title="Cadastrar produto"
                            description='Utilize esta função para cadastrar um novo produto no sistema. Após cadastrar o produto, ele ficará disponível para realizar entradas e saídas do estoque. Esta função irá gerar dados que serão exibidos nos gráficos na aba "Dashboard".' 
                            buttonTitle="Cadastrar produto"
                        />

                        <CardActions
                            title="Excluir produto"
                            description='Utilize esta função para excluir um produto existente no sistema. Após excluir o produto, ele não ficará mais disponível para realizar entradas ou saídas do estoque. Esta função irá gerar dados que serão exibidos nos gráficos na aba "Dashboard".' 
                            buttonTitle="Excluir produto"
                        />
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
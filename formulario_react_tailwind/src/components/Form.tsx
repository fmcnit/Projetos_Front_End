import { useState, FormEvent } from "react";
import { User } from "../types/User";
import { validate } from "../utils/validate";

const Form = () => {
    //logica do componente  
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [agree, setAgree] = useState(false)

    const [errors, setErrors] = useState<User | null>(null)

    const handleSubmit = (e : FormEvent) =>{
        e.preventDefault()
        setErrors(null)

        const data: User={
            name,
            email,
            agree,
        };

        const validateErrors = validate(data);

        console.log(data, validateErrors)

        if(Object.keys(validateErrors).length > 0){
            setErrors(validateErrors)
            return;  

        }
        alert("Obrigado por se cadastrar " + name)

        setName("");
        setEmail("");
        setAgree(false);  

        
    }

    return(
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label htmlFor="name">Nome</label>
                <input
                type="text"
                placeholder="Insira seu nome"
                className="rounded-lg py-2 px-2 text-sm" 
                value={name} 
                onChange={(e)=> setName(e.target.value)}
                />
                {errors?.name && (
                    <small className="text-xs text-red-500 mt-1">{errors?.name}</small>
                )}
            </div>
            <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                type="email"
                placeholder="Insira seu email"
                className="rounded-lg py-2 px-2 text-sm"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                />
                {errors?.email && (
                    <small className="text-xs text-red-500 mt-1">{errors?.email}</small>
                )}
                </div>

            <div className="flex flex-col">
                <a href="#" className="text-sm underline mb-2">Leia os termos</a>
            </div>

            <div className="flex gap-2 items-center">
                <input 
                type="checkbox"
                checked={agree} 
                onChange={(e)=> setAgree(e.target.checked)}
                />
                <label htmlFor="agree">Concordo com os termos</label>
                
                
            </div>
            {errors?.agree && (
                    <small className="text-xs text-red-500 mt-1">{errors?.agree}</small>
                )}
            <button
            type="submit"
            className="bg-slate-600 hover:bg-slate-500 font-medium text-sm py-2 px-4 rounded-lg text-white" >Cadastrar</button>
            

        </form>
    )
    
}
export default Form
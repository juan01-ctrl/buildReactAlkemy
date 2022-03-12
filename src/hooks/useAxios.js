import axios from "axios";
import { useEffect, useState } from "react";

 const useAxios = (url,update) => {
    const [resData, setResData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const getData = async()=>{

        try {
          setIsLoading(true)
          const {data} = await axios.get(url);
          setResData(data)
          
        } catch (error) {
          console.error(error,"ocurrio un error");
          setError(error)
        }finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getData()
    }, [update]);
        return {resData,error,isLoading}
}


export default useAxios;

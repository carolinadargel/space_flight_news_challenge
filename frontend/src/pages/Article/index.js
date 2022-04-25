import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import './article-info.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';


function Article(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadArticle(){
      await api.get(`/articles/${id}`, {

      })
      .then((response)=>{
        setArticle(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("ARTIGO NAO ENCONTRADO");
        navigate("/", { replace: true });
        return;
      })
    }

    loadArticle();


    return () => {
      console.log("COMPONENTE FOI DESMONTADO")
    }
  }, [navigate, id])


    if(loading){
    return(
      <div className="article-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }
  
  return(
    <div className="article-info">
      <h1>{article.title}</h1>
      <img src={article.imageUrl} alt={article.title} />

      <h3>Resumo</h3>
      <span>{article.summary}</span>

      <div className="area-buttons">
        <button> <Link to="/">Voltar</Link></button>
      </div>

    </div>
  )
}

export default Article;
import { useEffect, useState } from 'react';
import api from '../../services/api';
import './home.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const [sort, setSort] = useState('asc');
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [search, setSearch] = useState(false)


  useEffect(() => {

    let isCancelled = false;
    const loadArticles = async () => {
    
      if (!isCancelled) {
        let endpoint = sort  
        if (search) {endpoint = "/filterByName"}
        if (endpoint === 'asc' && !search){ endpoint = "/articles"}
        if (endpoint === 'desc' && !search) { endpoint = "/newest"}
            
        try {

          setLoading(true);

          const response = await api.get(endpoint, {
            params: {
              _start: start,
              _title: search,
              _sort: sort,
            }
          });

          setArticles((articles) => [...articles, ...response.data]);
       

        } catch (error) {

        } finally {
          setLoading(false);
        }
      }
    };

    loadArticles();

    return () => {
      isCancelled = true
    };
  }, [start, sort, search]);

  const loadMore = () => {
    setStart((start) => start + 10);
  };

  const switchSort = (newSort) => {
    if (newSort === sort) { return }
    if (search) {   
      setStart(0);
      setSort(newSort); 
    }
    setArticles([]);
    setStart(0);
    setSort(newSort);
  
  };

  const activateSearch = (event) => {
    if (event.key === 'Enter'){
      setArticles([]);
      setStart(0);
      setSearch(event.target.value);
    }
  };

  return (
    <div className="container">   
      <div className="d-flex flex-row-reverse">
      <div className="dropdown p-2">
        <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" type="button" id="dropdownMenu2" aria-expanded="false">
          Sort
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <li><button className="dropdown-item" type="button" onClick={() => {switchSort('asc')}}>Mais antigas</button></li>
          <li><button className="dropdown-item" type="button" onClick={() => {switchSort('desc')}}>Mais novas</button></li>
        </ul>
      </div>
      <div className='ml-auto p-2'>
        <input placeholder='Search' name="search" type="text" onKeyDown={activateSearch}></input>
        </div>

      </div>
      
      <div className="list-articles">
        {
        articles.map((article, index) => {
          
          let publishAt = article.publishedAt[8] + article.publishedAt[9] + "-" + article.publishedAt[5] + article.publishedAt[6] + "-" + article.publishedAt[0] + article.publishedAt[1] + article.publishedAt[2] + article.publishedAt[3]

          if (index % 2 === 0) {
            return (
              <article className="card d-flex" key={article.id}>
                <div className="card-wrapper left-card-1">
                  <div className="left-card-1">
                    <img src={`${article.imageUrl}`} className="card-img-top" loading="lazy" alt={article.title} />
                  </div>
                  <div className="right-card-1">
                    <div className="card-body">
                      <h5 className="card-title">{article.title}</h5>
                      <div className="d-flex bd-highlight">
                        <div className="p-2 flex-grow-1 bd-highlight">
                          {publishAt}
                        </div>
                        <div className="p-2 bd-highlight"> <a className="" rel="noreferrer" target="_blank" href={article.url}>{article.newsSite}</a></div>
                      </div>
                      <p className="card-text">{article.summary}</p>
                      <button className="btn btn-primary"><a className="btn-ver-mais" rel="noreferrer" target="_blank" href={article.url}>Ver Mais</a></button>
                    </div>
                  </div>
                </div>
              </article>
            )
          }

          return (
            <article className="card d flex" key={article.id}>
              <div className="card-wrapper right-card-2">
                <div className="left-card-2">
                  <div className="card-body">
                    <h5 className="card-title">{article.title}</h5>
                    <div className="d-flex bd-highlight">
                      <div className="p-2 flex-grow-1 bd-highlight">
                        {publishAt}
                      </div>
                      <div className="p-2 bd-highlight"> <a className="" rel="noreferrer" target="_blank" href={article.url}>{article.newsSite}</a></div>
                    </div>
                    <p className="card-text">{article.summary}</p>
                    <button className="btn btn-primary"><a className="btn-ver-mais" rel="noreferrer" target="_blank" href={article.url}>Ver Mais</a></button>
                  </div>
                </div>
                <div className="right-card-2">
                  <img src={`${article.imageUrl}`} className="card-img-top" loading="lazy" alt={article.title} />
                </div>
              </div>
            </article>
          )

        })}
      </div>
      <div className="pagination">
        <div className="d-grid gap-2 col-6 mx-auto">
          <button className="btn btn-outline-dark" onClick={loadMore}>{loading ? 'Carregando...' : 'Carregar mais artigos'}</button>
        </div>
      </div>
    </div>
  )
}

export default Home;
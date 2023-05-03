import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';


import './comicsList.scss';

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner />;
            break;
        case 'loading':
            return newItemLoading ? <Component /> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
            break;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('Uneexpected process state');
    }
}
const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [offset, setOffset] = useState(210);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const { loading, error, getAllComics,process, setProcess } = useMarvelService();

    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
        .then(onLoadComics)
        .then(() => setProcess('confirmed'))

    }

    const onLoadComics = (newComicsList) => {
        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setOffset(offset => offset + 9);
        setNewItemLoading(false);
    }

    function renderComics(arr) {

        const items = arr.map((item) => {

            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )

    }
    
    return (
        <div className="comics__list">
            {setContent(process, () => renderComics(comicsList), newItemLoading)}
            <button
            disabled= {newItemLoading}
                className="button button__main button__long"
                onClick={onRequest}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;
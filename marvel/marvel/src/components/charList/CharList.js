import './charList.scss';
import { useState, useEffect, useRef, useMemo } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import useMarvelService from '../../services/MarvelService';


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
const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    

    const {getAllCharacters, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
        console.log(1)
    },[])


    const onRequest = (offset,initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onLoadAll)
            .then(() => setProcess('confirmed'))
            console.log(2)
    }

    const onLoadAll = (newCharList) => {

        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    } 

    const itemRefs = useRef([])
    

    const onFocus = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItems (arr) {

        const items = arr.map((item,i) => {
            let className;
            if (item.thumbnail.slice(-12) === 'vailable.jpg') {
                className += ' not-vailable'
            }
            return (
                <li className="char__item"
                    ref={el => itemRefs.current[i] = el}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        onFocus(i);
                    }}
                    tabIndex={0}>
                    <img src={item.thumbnail} alt={item.name} className={className} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

        const elements = useMemo(() => {
            return setContent(process, () => renderItems(charList), newItemLoading);
        }, [process])

        return (
            <div className="char__list">
                {elements}
                <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{ 'display': charEnded ? 'none' : 'block' }}>
                    <div className="inner" >load more</div>
                </button>
            </div>
        )
    
}

export default CharList;
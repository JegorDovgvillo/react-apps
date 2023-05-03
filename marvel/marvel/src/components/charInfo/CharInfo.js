import { useState, useEffect } from 'react';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';

import './charInfo.scss';


const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const { getCharacter, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [])

    useEffect(() => {
        updateChar()
    }, [props.charId])


    const updateChar = () => {
        const { charId } = props
        if (!charId) {
            return;
        }

        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }
    const onCharLoaded = (char) => {
        setChar(char);
    }

    // const skeleton = char || loading || error ? null : <Skeleton />
    // const errorMessage = error ? <ErrorMessage /> : null;
    // const spinner = loading ? <Spinner /> : null;
    // const content = !(error || loading || !char) ? <View char={char} /> : null;

    return (

        <div className="char__info">
            {setContent(process, View, char)}
            {/* {skeleton}
            {errorMessage}
            {content}
            {spinner} */}
        </div>
    )
}
const View = ({ data }) => {
    const { name, description, thumbnail, homePage, wiki, comics } = data;
    let comicsLength;
    if (comics.length > 10) {
        comicsLength = comics.slice(0, 10)
    } else if (comics.slice(0, 10) == 0) {
        comicsLength = [
            { name: 'Для данного персонажа нет комиксов' }
        ]
    } else {
        comicsLength = comics
    }
    let className;
    if (thumbnail.slice(-12) === 'vailable.jpg') {
        className += ' not-vailable'
    }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} className={className} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comicsLength.map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )

                    })
                }
            </ul>

        </>
    )
}
export default CharInfo;
import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const {request,clearError, process, setProcess} = useHttp();

	const _apiBase = "https://gateway.marvel.com:443/v1/public/";
	// ЗДЕСЬ БУДЕТ ВАШ КЛЮЧ, ЭТОТ КЛЮЧ МОЖЕТ НЕ РАБОТАТЬ
	const _apiKey = "apikey=0c4b2e4abb7e77a2d90bb9b7a5dde52c";
	const _baseOffset = 210;

	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(
			`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
		);
		return res.data.results.map(_transformCharacter);
	};

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
	};
    const getAllComics = async(offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }
	const getComics = async(id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComics(res.data.results[0]);
	}
	const getCharacterByName = async(name) => {
		const res= await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
		return res.data.results.map(_transformCharacter)
	}
	const _transformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: "There is no description for this character",
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
		};
	};
    const _transformComics = (item) => {
		return {
			id: item.id,
			name: item.title,
			description: item.description
				? `${item.description.slice(0, 210)}...`
				: "There is no description for this character",
			thumbnail: item.thumbnail.path + "." + item.thumbnail.extension,
			homepage: item.urls[0].url,
			price: item.price,
			pageCount: item.pageCount ? `${item.pageCount} p.` : "o information about the number of pages",
			language: item.textObjects.language || 'en-us'
		};
	};

	return {
		getAllCharacters,
		getCharacter,
        clearError,
        getAllComics,
		getComics,
		getCharacterByName,
		process,
		setProcess
	};
};

export default useMarvelService;

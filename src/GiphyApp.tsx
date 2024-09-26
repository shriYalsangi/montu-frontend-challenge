import React, { useEffect, useState } from 'react';
import GifGrid from '@/components/GifGrid';
import SearchBar from '@/components/SearchBar';
import Skeleton from '@/components/Skeleton';
import useGifSearch from '@/use/use-gif-search';
import { Gif } from '@/store';
import SavedGifsGrid from '@/components/SavedGifsGrid';

const GiphyApp: React.FC = () => {

  const { gifs, loading, handleSearch, loadMore } = useGifSearch(20);

  const [savedGifs, setSavedGifs] = useState(() => {
    const saved = localStorage.getItem('savedGifs')
    return saved ? JSON.parse(saved) : []
  })
  const [showSaved, setShowSaved] = useState(false)

  useEffect(() => {
    localStorage.setItem('savedGifs', JSON.stringify(savedGifs))
  }, [savedGifs])

  const saveGif = (gif: Gif) => {
    setSavedGifs((prevSaved: Gif[]) => {
      const isAlreadySaved = prevSaved.some(savedGif => savedGif.id === gif.id);
      if (isAlreadySaved) {
        return prevSaved.filter(savedGif => savedGif.id !== gif.id);
      } else {
        return [...prevSaved, gif];
      }
    });
  };

  const unSaveGif = (gifId: string) => {
    setSavedGifs((prevSaved: Gif[]) => prevSaved.filter((gif) => gif.id !== gifId))
  }

  const savedGifIds = savedGifs.map((gif: Gif) => gif.id)
 
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Giphy Search App</h1>
      <SearchBar onSearch={handleSearch} />
      <button 
        onClick={() => setShowSaved(!showSaved)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {showSaved ? 'Show Search Results' : 'Show Saved GIFs'}
      </button>
      {showSaved 
        ? <SavedGifsGrid savedGifs={savedGifs} onUnsave={unSaveGif} />
        : (
          <>
            {loading ? <Skeleton count={20} /> : <GifGrid gifs={gifs} loading={loading} onSave={saveGif} savedGifIds={savedGifIds} />}
            <div className='flex justify-center items-center'>
              {!loading && (
                <button onClick={loadMore} className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Show More
                </button>
              )}
            </div>
          </>
        )
      }
    </div>
  );
};

export default GiphyApp;

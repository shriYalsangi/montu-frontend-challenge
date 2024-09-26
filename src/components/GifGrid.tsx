import { Gif } from '@/store';
import React, { useEffect, useState } from 'react';
import Skeleton from './Skeleton';
import { Heart } from 'lucide-react';

interface GifGridProps {
  gifs: Gif[];
  loading: boolean
  onSave: (gif: Gif) => void
  savedGifIds: string[]
}

const GifGrid: React.FC<GifGridProps> = ({ gifs, loading, onSave, savedGifIds }) => {

  const [savedGifs, setSavedGifs] = useState<Record<string, boolean>>({})

  // Initialize savedGifs state based on savedGifIds prop
  useEffect(() => {
    const initialSavedState = savedGifIds.reduce((acc, id) => {
      acc[id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setSavedGifs(initialSavedState);
  }, [savedGifIds]);

  const handleSave = (gif: Gif) => {
    setSavedGifs((prev) => {
      const newState = { ...prev, [gif.id]: !prev[gif.id] };
      onSave(gif);
      return newState;
    });
  };
  
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <Skeleton count={gifs.length} />
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {gifs.map((gif) => (
        <div key={gif.id} className='relative mb-8'>
          <img src={gif.images.fixed_height.url} alt={gif.title} className="w-full h-full object-cover rounded-md mb-2" />
          <button onClick={() => handleSave(gif)} className="absolute top-2 right-2 p-2">
            <Heart size={24} fill={savedGifs[gif.id] ? 'red' : 'white'} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default GifGrid;

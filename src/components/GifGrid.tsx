import { Gif } from '@/store';
import React from 'react';
import Skeleton from './Skeleton';

interface GifGridProps {
  gifs: Gif[];
  loading: boolean
}

const GifGrid: React.FC<GifGridProps> = ({ gifs, loading }) => {
  
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
        <div key={gif.id}>
          <img src={gif.images.fixed_height.url} alt={gif.title} className="w-full h-full object-cover rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default GifGrid;

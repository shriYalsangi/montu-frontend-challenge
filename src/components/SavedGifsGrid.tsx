import React from 'react'
import { Gif } from '@/store';
import { Heart } from 'lucide-react';

interface SavedGifsGridProps {
  savedGifs: Gif[]
  onUnsave: (gifId: string) => void
}

const SavedGifsGrid: React.FC<SavedGifsGridProps> = ({ savedGifs, onUnsave }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {
        savedGifs.map((gif) => (
          <div key={gif.id} className="relative">
            <img src={gif.images.fixed_height.url} alt={gif.title} className="w-full h-full object-cover rounded-md" />
            <button onClick={() => onUnsave(gif.id)} className="absolute top-2 right-2 p-1">
              <Heart size={24} fill='red' />
            </button>
          </div>
        ))
      }
    </div>
  )
}

export default SavedGifsGrid

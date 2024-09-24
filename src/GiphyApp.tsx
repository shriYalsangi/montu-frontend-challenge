import React, { useState, useEffect } from 'react';
import { fetchTrendingGifs, searchGifs } from '@/api-calls';
import GifGrid from '@/components/GifGrid';
import SearchBar from '@/components/SearchBar';
import Skeleton from '@/components/Skeleton';
import { Gif } from './store';

const GiphyApp: React.FC = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const LIMIT = 20;

  useEffect(() => {
    fetchGifs();
  }, []);

  const fetchGifs = async () => {
    setLoading(true);
    try {
      const response = await fetchTrendingGifs(LIMIT, offset);
      setGifs(prevGifs => [...prevGifs, ...response.data.data])
      setOffset(prevOffset => prevOffset + LIMIT)
    } catch (error) {
      console.error('Error fetching trending GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim()
    if (!trimmedSearchTerm) return

    setLoading(true);
    setQuery(trimmedSearchTerm);
    await search(trimmedSearchTerm, LIMIT, 0)
  };

  const search = async (query: string, LIMIT: number, offset: number) => {    
    try {
      const response = await searchGifs(query, LIMIT, offset);
      setGifs(response.data.data);
      setOffset(LIMIT)
    } catch (error) {
      console.error('Error searching GIFs:', error);
    } finally {
      setLoading(false);
    }
  }

  const loadMore = async () => {
    setLoading(true);
    try {
      let response;
      if (query) {
        response = await searchGifs(query, LIMIT, offset);
      } else {
        response = await fetchTrendingGifs(LIMIT, offset);
      }
      setGifs(prevGifs => [...prevGifs, ...response.data.data]);
      setOffset(prevOffset => prevOffset + LIMIT);

    } catch (error) {
      console.error('Error loading more GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Giphy Search App</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? <Skeleton count={LIMIT} /> : <GifGrid gifs={gifs} loading={loading} />}
      <div className='flex justify-center items-center'>
      {!loading && (
        <button onClick={loadMore} className="mt-8 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Show More
        </button>
      )}
      </div>
    </div>
  );
};

export default GiphyApp;

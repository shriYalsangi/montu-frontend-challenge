import { useState, useEffect } from 'react';
import { fetchTrendingGifs, searchGifs } from '@/api-calls';
import { Gif } from '@/store';

const useGifSearch = (LIMIT = 20) => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchGifs();
  }, []);

  const fetchGifs = async () => {
    setLoading(true);
    try {
      const response = await fetchTrendingGifs(LIMIT, offset);
      setGifs(prevGifs => [...prevGifs, ...response.data.data]);
      setOffset(prevOffset => prevOffset + LIMIT);
    } catch (error) {
      console.error('Error fetching trending GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm: string) => {
    const trimmedSearchTerm = searchTerm.trim();
    if (!trimmedSearchTerm) return;

    setLoading(true);
    setQuery(trimmedSearchTerm);
    await search(trimmedSearchTerm, LIMIT, 0);
  };

  const search = async (query: string, LIMIT: number, offset: number) => {
    try {
      const response = await searchGifs(query, LIMIT, offset);
      setGifs(response.data.data);
      setOffset(LIMIT);
    } catch (error) {
      console.error('Error searching GIFs:', error);
    } finally {
      setLoading(false);
    }
  };

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

  return {
    gifs,
    loading,
    handleSearch,
    loadMore,
  };
};

export default useGifSearch;

import MovieService from '@/services/MovieService';
import { useState } from 'react';
import { Movie } from '@/types';

const MovieForm: React.FC = () => {
    const [name, setName] = useState('');
    const [year, setYear] = useState<number | ''>('');   
    const [img, setImg] = useState('');
    const [authorId, setAuthorId] = useState<number | ''>('');
    const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !year || !img.trim() || !authorId) {
            setStatus({ message: 'All fields are required', type: 'error' });
            return;
        }

        setIsLoading(true);
        setStatus(null);

        try {
            const response = await MovieService.createMovie({
                name,
                year: Number(year),
                img,
                author: { id: Number(authorId) } 
            } as Movie);

            if (response.ok) {
                setStatus({ message: 'Movie created successfully!', type: 'success' });
                setName('');
                setYear('');
                setImg('');
                setAuthorId('');
            } else {
                const errorData = await response.json();
                setStatus({ message: errorData.message || 'Failed to create movie', type: 'error' });
            }
        } catch (error) {
            setStatus({ message: 'An error occurred. Please try again.', type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Add movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value ? Number(e.target.value) : '')}
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Author ID"
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value ? Number(e.target.value) : '')}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                </button>
            </form>
            {status && (
                <p style={{ color: status.type === 'error' ? 'red' : 'green' }}>
                    {status.message}
                </p>
            )}
        </div>
    );
};

export default MovieForm;

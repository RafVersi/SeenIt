import AuthorService from '@/services/AuthorService';
import { useState } from 'react';

const AuthorForm: React.FC = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [birth, setBirth] = useState('');
    const [img, setImg] = useState('');
    const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!firstname.trim() || !lastname.trim() || !birth || !img.trim()){
            setStatus({ message: 'Input is required', type: 'error' });
        }
        setIsLoading(true);
        setStatus(null);

        try {
            const response = await AuthorService.createAuthor({
                firstname,
                lastname,
                birth: new Date(birth),
                img
            });

            if(response.ok){
                setStatus({ message: 'Author created successfully!', type: 'success' });
                setFirstname('');
                setLastname('');
                setBirth('');
                setImg('');
            }else {
                const errorData = await response.json();
                setStatus({ message: errorData.message || 'Failed to create author', type: 'error' });
            }
        } catch (error) {
            setStatus({ message: 'An error occurred. Please try again.', type: 'error' });
        }
    }

    return(
        <>
            <div>
                <h2>add author</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Firstname" 
                        value={firstname} 
                        onChange={(e) => setFirstname(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Lastname" 
                        value={lastname} 
                        onChange={(e) => setLastname(e.target.value)} 
                    />
                    <input 
                        type="date" 
                        value={birth} 
                        onChange={(e) => setBirth(e.target.value)} 
                    />
                    <input 
                        type="text" 
                        placeholder="Image URL" 
                        value={img} 
                        onChange={(e) => setImg(e.target.value)} 
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </>
    )
}

export default AuthorForm;
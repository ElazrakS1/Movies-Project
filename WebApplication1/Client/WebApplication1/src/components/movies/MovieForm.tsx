import { NavLink, useNavigate, useParams } from "react-router-dom";
import { MovieDto } from "../../models/movieDto";
import { ChangeEvent, useEffect, useState } from "react";
import apiConnector from "../../api/apiConnector";
import { Button, Form, Header, Icon, Segment, Container } from "semantic-ui-react";

export default function MovieForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(true);

    const formStyles = {
        padding: '2em',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const inputStyles = {
        color: isDarkMode ? 'white' : 'black',
        backgroundColor: isDarkMode ? '#2C2C2C' : 'white',
        border: isDarkMode ? '1px solid #444' : '1px solid #ddd',
        borderRadius: '5px',
        marginBottom: '1em'
    };

    const [movie, setMovie] = useState<MovieDto>({
        id: undefined,
        title: '',
        description: '',
        createDate: undefined,
        category: ''
    });

    useEffect(() => {
        if (id) {
            apiConnector.getMovieById(id).then(movie => setMovie(movie!))
        }
    }, [id]);

    function handleSubmit() {
        if (!movie.id) {
            apiConnector.createMovie(movie).then(() => navigate('/'));
        } else {
            apiConnector.editMovie(movie).then(() => navigate('/'));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setMovie({ ...movie, [name]: value });
    }

    function toggleMode() {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <Container style={{ marginTop: '2em' }}>
            <Segment clearing className={isDarkMode ? 'inverted' : ''} style={formStyles}>
                <Header as='h2' textAlign='center' className={isDarkMode ? 'inverted' : ''}>
                    <Icon name='film' />
                    <Header.Content>
                        {id ? 'Edit Movie' : 'Create New Movie'}
                        <Header.Subheader style={{ marginTop: '0.5em' }}>
                            {id ? 'Update movie details' : 'Add a new movie to the collection'}
                        </Header.Subheader>
                    </Header.Content>
                </Header>

                <Button
                    onClick={toggleMode}
                    size='tiny'
                    circular
                    icon
                    style={{ position: 'absolute', right: '1em', top: '1em' }}
                >
                    <Icon name={isDarkMode ? 'sun' : 'moon'} />
                </Button>

                <Form onSubmit={handleSubmit} autoComplete='off' className={`ui ${isDarkMode ? 'inverted' : ''} form`}>
                    <Form.Field>
                        <label>Title</label>
                        <Form.Input
                            placeholder='Enter movie title'
                            name='title'
                            value={movie.title}
                            onChange={handleInputChange}
                            style={inputStyles}
                            icon='header'
                            iconPosition='left'
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Description</label>
                        <Form.TextArea
                            placeholder='Enter movie description'
                            name='description'
                            value={movie.description}
                            onChange={handleInputChange}
                            style={{
                                ...inputStyles,
                                minHeight: 100,
                                backgroundColor: `${isDarkMode ? '#2C2C2C !important' : 'white'}`,
                                color: `${isDarkMode ? 'white !important' : 'black'}`,
                                opacity: 1
                            }}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Category</label>
                        <Form.Input
                            placeholder='Enter movie category'
                            name='category'
                            value={movie.category}
                            onChange={handleInputChange}
                            style={inputStyles}
                            icon='tag'
                            iconPosition='left'
                        />
                    </Form.Field>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '1em',
                        marginTop: '2em',
                        padding: '1em 0'
                    }}>
                        <Button
                            as={NavLink}
                            to='/'
                            type='button'
                            size='large'
                            className={isDarkMode ? 'inverted' : ''}
                            style={{
                                minWidth: '120px',
                                transition: 'all 0.3s ease',
                                borderRadius: '20px'
                            }}
                        >
                            <Icon name='arrow left' />
                            Cancel
                        </Button>
                        <Button
                            positive
                            type='submit'
                            size='large'
                            style={{
                                minWidth: '120px',
                                transition: 'all 0.3s ease',
                                borderRadius: '20px',
                                background: '#21ba45',
                                boxShadow: '0 4px 6px rgba(33, 186, 69, 0.2)'
                            }}
                        >
                            <Icon name={id ? 'sync' : 'plus'} />
                            {id ? 'Update' : 'Create'}
                        </Button>
                    </div>
                </Form>
            </Segment>
        </Container>
    );
}
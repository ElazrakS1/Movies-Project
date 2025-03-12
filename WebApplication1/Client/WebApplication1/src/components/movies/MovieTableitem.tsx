import { Button, Icon } from "semantic-ui-react";
                            import { MovieDto } from "../../models/movieDto.ts";
                            import apiConnector from "../../api/apiConnector.ts";
                            import { NavLink } from "react-router-dom";
                            
                            interface Props {
                                movie: MovieDto;
                                isDarkMode: boolean;
                            }
                            
                            export default function MovieTableItem({ movie, isDarkMode }: Props) {
                                const rowStyles = {
                                    backgroundColor: isDarkMode ? '#1B1C1D' : '#ffffff',
                                    color: isDarkMode ? '#ffffff' : '#000000',
                                    transition: 'all 0.3s ease',
                                    fontSize: '15px',
                                    borderCollapse: 'separate' as const,
                                    borderSpacing: '0 10px'
                                };
                            
                                const buttonContainerStyles = {
                                    display: 'flex',
                                    gap: '12px',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                };
                            
                                const buttonStyles = {
                                    borderRadius: '8px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                    minWidth: '90px',
                                    padding: '8px 16px'
                                };
                            
                                const cellStyles = {
                                    padding: '20px 15px',
                                    verticalAlign: 'middle',
                                    textAlign: 'center' as const,
                                    backgroundColor: isDarkMode ? '#1B1C1D' : '#ffffff',
                                    border: '8px solid #000000',
                                    borderLeft: '0',
                                    borderRight: '0',
                                    margin: '10px 0'
                                };
                            
                                const handleDelete = async () => {
                                    if (window.confirm('Are you sure you want to delete this movie?')) {
                                        await apiConnector.deleteMovie(movie.id!);
                                        window.location.reload();
                                    }
                                };
                            
                                return (
                                    <tr style={rowStyles}>
                                        <td style={cellStyles}>{movie.id}</td>
                                        <td style={cellStyles}>{movie.title}</td>
                                        <td style={cellStyles}>{movie.description}</td>
                                        <td style={cellStyles}>{movie.createDate}</td>
                                        <td style={cellStyles}>{movie.category}</td>
                                        <td style={cellStyles}>
                                            <div style={buttonContainerStyles}>
                                                <Button
                                                    as={NavLink}
                                                    to={`editMovie/${movie.id}`}
                                                    color="yellow"
                                                    size="small"
                                                    style={buttonStyles}
                                                    className={isDarkMode ? 'inverted' : ''}
                                                >
                                                    <Icon name="edit" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    negative
                                                    size="small"
                                                    style={buttonStyles}
                                                    onClick={handleDelete}
                                                    className={isDarkMode ? 'inverted' : ''}
                                                >
                                                    <Icon name="trash" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
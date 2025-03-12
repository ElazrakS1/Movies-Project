import React, { useState, useEffect } from 'react';
                                                import {Container, Button, Pagination, Dropdown} from 'semantic-ui-react';
                                                import { NavLink } from 'react-router-dom';
                                                import {PaginationRequestParams} from "../../models/paginationResponse.ts";
                                                import {MovieDto} from "../../models/movieDto.ts";
                                                import apiConnector from "../../api/apiConnector.ts";
                                                import MovieTableItem from "./MovieTableitem.tsx";
                                                
                                                export default function MovieTable() {
                                                    const [movies, setMovies] = useState<MovieDto[]>([]);
                                                    const [totalItems, setTotalItems] = useState(0);
                                                    const [currentPage, setCurrentPage] = useState(1);
                                                    const [pageSize, setPageSize] = useState(5);
                                                    const [isDarkMode] = useState(true);
                                                
                                                    const tableStyles = {
                                                        borderCollapse: 'separate' as const,
                                                        borderSpacing: '0 8px',
                                                        width: '100%'
                                                    };
                                                
                                                    const fetchData = async () => {
                                                        try {
                                                            const response = await apiConnector.getMovies({
                                                                pageSize,
                                                                pageNumber: currentPage
                                                            });
                                                
                                                            if (response) {
                                                                // Calculate start and end indices for the current page
                                                                const start = (currentPage - 1) * pageSize;
                                                                const end = start + pageSize;
                                                                
                                                                // Slice the data array to get only the items for the current page
                                                                const paginatedData = response.data.slice(start, end);
                                                                
                                                                setMovies(paginatedData);
                                                                setTotalItems(response.data.length);
                                                            }
                                                        } catch (error) {
                                                            console.error('Error fetching movies:', error);
                                                            setMovies([]);
                                                            setTotalItems(0);
                                                        }
                                                    };
                                                
                                                    useEffect(() => {
                                                        fetchData();
                                                    }, [currentPage, pageSize]);
                                                
                                                    const handlePageNumberChange = (_: React.MouseEvent<HTMLAnchorElement>, data: any) => {
                                                        setCurrentPage(Number(data.activePage));
                                                    };
                                                
                                                    const handlePageSizeChange = (_: React.SyntheticEvent<HTMLElement>, data: any) => {
                                                        setPageSize(Number(data.value));
                                                        setCurrentPage(1);
                                                    };
                                                
                                                    const pageSizeOptions = [
                                                        { key: '5', text: '5 per page', value: 5 },
                                                        { key: '10', text: '10 per page', value: 10 },
                                                        { key: '20', text: '20 per page', value: 20 },
                                                        { key: '30', text: '30 per page', value: 30 }
                                                    ];
                                                
                                                    return (
                                                        <Container className="container-style">
                                                            <table className={`ui ${isDarkMode ? 'inverted' : ''} table`} style={tableStyles}>
                                                                <thead style={{ textAlign: 'center' }}>
                                                                    <tr>
                                                                        <th>Id</th>
                                                                        <th>Title</th>
                                                                        <th>Description</th>
                                                                        <th>CreateDate</th>
                                                                        <th>Category</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {movies.map((movie, index) => (
                                                                        <MovieTableItem
                                                                            key={movie.id || index}
                                                                            movie={movie}
                                                                            isDarkMode={isDarkMode}
                                                                        />
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                            <div style={{
                                                                marginTop: '20px',
                                                                display: 'flex',
                                                                justifyContent: 'space-between',
                                                                alignItems: 'center'
                                                            }}>
                                                                <Dropdown
                                                                    selection
                                                                    compact
                                                                    options={pageSizeOptions}
                                                                    value={pageSize}
                                                                    onChange={handlePageSizeChange}
                                                                    className={isDarkMode ? 'inverted' : ''}
                                                                />
                                                                {totalItems > pageSize && (
                                                                    <Pagination
                                                                        activePage={currentPage}
                                                                        totalPages={Math.ceil(totalItems / pageSize)}
                                                                        onPageChange={handlePageNumberChange}
                                                                        className={isDarkMode ? 'inverted' : ''}
                                                                    />
                                                                )}
                                                                <Button
                                                                    as={NavLink}
                                                                    to="createMovie"
                                                                    floated="right"
                                                                    type="button"
                                                                    content="Create Movie"
                                                                    positive
                                                                    className={isDarkMode ? 'inverted' : ''}
                                                                />
                                                            </div>
                                                        </Container>
                                                    );
                                                }
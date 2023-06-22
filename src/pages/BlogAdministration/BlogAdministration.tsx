import React from 'react'
import CircularLoader from '../../components/Loader/CircularLoader';
import { Box, Button } from "@mui/material";
import { getArticles } from '../../api/blog/blog';
import { useQuery } from "@tanstack/react-query";
import CreateArticle from './components/CreateArticle';
import AddCardIcon from "@mui/icons-material/AddCard";

const BlogAdministration = () => {
    const [open, setOpen] = React.useState(false);
    const query = useQuery(["categoriesData"], () => getArticles(), {
        retry: 1,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error: any) => {
            console.log(error.response.status);
        },
    });

    if (query.isLoading || query.isError) {
        return <CircularLoader />;
    }

    return (
        <Box sx={{ flexGrow: 1, height: "100%" }}>
            <Button
                variant="contained"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    marginBottom: "15px",
                    "&:hover": {
                        // backgroundColor: theme.palette.success.light,
                    },
                }}
                onClick={() => setOpen(true)}
            >
                <AddCardIcon />
                Add Article
            </Button>
            {/* <CategoriesTable data={query.data} /> */}
            <CreateArticle open={open} setOpen={setOpen} />
        </Box>
    );
}

export default BlogAdministration
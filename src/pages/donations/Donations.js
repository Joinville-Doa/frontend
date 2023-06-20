import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Navbar from "../../components/Navbar";
import { useQuery, gql } from "@apollo/client";
import Search from "@mui/icons-material/Search";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import {
  CardActionArea,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

const GET_DATA = gql`
  query Donations($limit: Int, $offset: Int) {
    donations(limit: $limit, offset: $offset) {
      id
      title
      imageOne
    }
  }
`;

const PAGE_LIMIT = 12;
const LOAD_MORE_LIMIT = 8;

function useIntersectionObserver(callback, options) {
  const observerRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [callback, options]);

  return observerRef;
}

export default function Donations() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isFetchingMore, setIsFetchingMore] = React.useState(false);
  const navigate = useNavigate();

  const { loading, error, data, fetchMore } = useQuery(GET_DATA, {
    variables: { limit: PAGE_LIMIT, offset: 0 },
  });

  const filteredDonations = React.useMemo(() => {
    if (!data) {
      return [];
    }
    return data.donations.filter((donation) =>
      donation.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLoadMore = React.useCallback(() => {
    if (!isFetchingMore) {
      setIsFetchingMore(true);
      fetchMore({
        variables: {
          offset: data.donations.length,
          limit: LOAD_MORE_LIMIT,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          setIsFetchingMore(false);
          return {
            donations: [...prev.donations, ...fetchMoreResult.donations],
          };
        },
      });
    }
  }, [data, fetchMore, isFetchingMore]);

  const handleViewDonation = (id) => {
    navigate(`/doacao/${id}`);
  };

  const handleObserver = React.useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isFetchingMore) {
        handleLoadMore();
      }
    },
    [handleLoadMore, isFetchingMore]
  );

  const observerRef = useIntersectionObserver(handleObserver, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  });

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro :(</p>;

  return (
    <>
      <Navbar />
      <TextField
        label="Procurar..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        style={{
          maxWidth: 500,
          margin: "auto",
          marginTop: 30,
          alignContent: "center",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Grid container spacing={2} style={{ padding: 50 }}>
        {filteredDonations.map((donation, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={donation.id}>
            <Card
              sx={{
                maxHeight: 300,
                maxWidth: 300,
                marginBottom: 5,
                padding: 1,
                boxShadow: 3,
                borderRadius: 1,
                "&:hover": {
                  boxShadow: 5,
                  borderRadius: 2,
                  cursor: "pointer",
                },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="220"
                  image={donation.imageOne}
                  alt="Imagem da doação"
                  onClick={() => handleViewDonation(donation.id)}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    style={{
                      textAlign: "center",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "300px",
                    }}
                  >
                    {donation.title.length > 22
                      ? donation.title.substring(0, 22) + " ..."
                      : donation.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            {index === filteredDonations.length - 1 && (
              <div ref={observerRef}></div>
            )}
          </Grid>
        ))}
      </Grid>
      {isFetchingMore && <p>Carregando mais doações...</p>}
      <Footer />
    </>
  );
}

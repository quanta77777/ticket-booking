import React, { useState } from "react";
import Movie from "../Movie/Movie";
import Trailer from "../Trailer";
import { useGetMovies } from "../../../api/movie";
type Props = {
  value: string;
};

const ListMovie = (props: Props) => {
  const { data, isLoading, isError } = useGetMovies();

  const [open, setOpen] = useState(false);
  const value = props.value;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching movie</div>;
  console.log(data);
  return (
    <>
      {value === "now" ? (
        <div className="flex flex-wrap  gap-7">
          {data.map((item: any) => (
            <Movie
              key={item.movie_id}
              data={item}
              open={open}
              setOpen={setOpen}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap  gap-7">
          {data.map((item: any) => (
            <Movie
              key={item.movie_id}
              data={item}
              open={open}
              setOpen={setOpen}
            />
          ))}
        </div>
      )}
      <Trailer open={open} setOpen={setOpen} />
    </>
  );
};

export default ListMovie;

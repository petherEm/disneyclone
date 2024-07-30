import MoviesCarousel from "@/components/MoviesCarousel";
import { getDiscoverMovies } from "@/lib/getMovies";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};

const GenrePage = async ({
  params: { id },
  searchParams: { genre },
}: Props) => {
  console.log(id, genre);

  const movies = await getDiscoverMovies(id);

  return (
    <div className="max-w-7xl mx-auto">
      {/* AI OPENAI  service suggestion */}
      {/* AI AZURE service suggestion */}

      <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
        <h1>Results for {genre}</h1>
      </div>

      <MoviesCarousel movies={movies} title={"Genre"} isVertical />
    </div>
  );
};

export default GenrePage;

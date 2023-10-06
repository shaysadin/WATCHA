// import { NextApiRequest, NextApiResponse } from "next";
// import prismadb from '@/lib/prismadb';
// import serverAuth from "@/lib/serverAuth";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== 'GET') {
//         return res.status(405).end();
//     }

//     try {
//         await serverAuth(req, res);
        
//         const { genre } = req.query;

//         let movies;

//         if (genre) {
//             const genreFilter = Array.isArray(genre) ? { in: genre } : genre;
    
//             movies = await prismadb.movie.findMany({
//                 where: {
//                     genre: genreFilter
//                 }
//             });
//         } else {
//             // If no genre query parameter is provided, fetch all movies
//             movies = await prismadb.movie.findMany();
//         }

//         return res.status(200).json(movies);

//     } catch (error) {
//         console.log(error);
//         return res.status(400).end();
//     }
// }

import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      await serverAuth(req, res);
      
      const { genre } = req.query;

      let movies;

      if (genre) {
        const genreFilter = Array.isArray(genre) ? { in: genre } : genre;
  
        movies = await prismadb.movie.findMany({
          where: {
            genre: genreFilter
          }
        });
      } else {
        // If no genre query parameter is provided, fetch all movies
        movies = await prismadb.movie.findMany();
      }

      return res.status(200).json(movies);
    } catch (error) {
      console.log(error);
      return res.status(400).end();
    }
  } else if (req.method === 'POST') {
    try {
      // Assuming you have a JSON body in the POST request with movie data
      const movieData = req.body;

      // Create a new movie in the database using Prisma
      const createdMovie = await prismadb.movie.create({
        data: movieData,
      });

      return res.status(201).json(createdMovie);
    } catch (error) {
      console.error(error);
      return res.status(500).end();
    }
  } else {
    // Return a 405 Method Not Allowed status for other HTTP methods
    return res.status(405).end();
  }
}
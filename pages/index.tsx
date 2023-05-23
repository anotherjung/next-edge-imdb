import type { NextPage } from 'next';
import Link from 'next/link';

type Page = {
  id: string;
  title: string;
  content: string;
}

const HomePage: NextPage = () => {
  const pages: Page[] = [
    {
      id: "movies",
      title: 'Movies',
      content: 'api data with query builder',
    },
    {
      id: "persons",
      title: 'Persons',
      content: 'api data with query builder',
    },
  ]
  return (
    <main>
      {pages.map((p,index) => (
        <div key={index} className="m-3 p-3 bg-gray-300">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-2xl">
              <Link href={p.id}><h2>{p.title}</h2></Link>
              <p >{p.content}</p>
            </div>
          </div>
        </div>
      ))}
    </main>
  )
  //
}

export default HomePage;


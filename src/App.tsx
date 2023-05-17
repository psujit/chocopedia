import { ChocolateList } from './components/ChocolateList/ChocolateList.tsx'
import { useFetch } from './hooks/use-fetch.ts'

function App() {
  const { chocolateList, setChocolateList } = useFetch()
  return (
    <div className="flex justify-center w-full px-4 py-6 mx-auto bg-white rounded">
      <div className="flex pl-3">
        <ChocolateList chocolateList={chocolateList} setChocolateList={setChocolateList} />
      </div>
    </div>
  )
}

export default App

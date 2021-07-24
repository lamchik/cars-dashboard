import React, {useState, useEffect} from 'react'
import {getCarsTable} from '../../api/cars'
import Search from "../../components/Search"
import CarsTable from '../../components/Table'
import Result from '../../components/Result'
import Preloader from '../../components/ui/Preloader'
import Error from '../../components/ui/Error'

import "./styles.css"

const DATA_STATE_IDLE = 1
const DATA_STATE_LOADING = 2
const DATA_STATE_LOADED = 3
const DATA_STATE_ERROR = 4

const getCarLabel = (car, tariff) => {
  return `Выбран автомобиль ${car.mark} ${car.model} ${car.tariffs[tariff].year} года выпуска`
}

const Table = () => {
  const [search, setSearch] = useState(undefined)

  // data state for API request
  const [dataState, setDataState] = useState(DATA_STATE_IDLE)
  // error for API request
  const [error, setError] = useState("")

  const [cars, setCars] = useState([]);
  const [tariffs, setTariffs] = useState([]);
  const [sortOrder, setSortOrder] = useState(1);

  const [chosenCarLabel, setChosenCarLabel] = useState(undefined);

  useEffect(() => {
    async function fetchData () {
      // perform API request
      const {cars, tariffs_list} = await getCarsTable()
      setCars(cars)
      setTariffs(tariffs_list)
      setDataState(DATA_STATE_LOADED)
    }

    // initialize data loading
    setDataState(DATA_STATE_LOADING)
    fetchData().catch((err) => {
      // we encountered an error
      setDataState(DATA_STATE_ERROR)
      setError(err)
    })
  }, [])

  const onSearchHandler = (query) => {
    setSearch(query)
  }

  const changeSortOrder = () => {
    setSortOrder(sortOrder === -1 ? 1 : -1)
  }

  const chooseCar = (car, tariff) => {
    // car doesn't have requested tariff, that meant user clicked on '-' sign. Do nothing.
    if (car.tariffs[tariff] === undefined) return;

    setChosenCarLabel(getCarLabel(car, tariff))
  }

  const renderContent = () => {
    if (dataState === DATA_STATE_IDLE || dataState === DATA_STATE_LOADING) {
      return <div className="preloader-wrapper"><Preloader /></div>
    }

    if (dataState === DATA_STATE_LOADED) {
      return (
        <CarsTable
          cars={cars}
          tariffs={tariffs}
          sortOrderDesc={sortOrder}
          changeSortOrder={changeSortOrder}
          searchQuery={search}
          chooseCar={chooseCar}
        />
      )
    }

    if (dataState === DATA_STATE_ERROR) {
      return <Error error={error} />
    }

    console.error("Illegal place")
  }

  return (
    <div>
      <div className="content-wrapper">
        <Search onSubmit={onSearchHandler} />
      </div>
      <div className="content-wrapper">
        {renderContent()}
      </div>
      {chosenCarLabel && <Result text={chosenCarLabel} /> }
    </div>
  )
}

export default Table;
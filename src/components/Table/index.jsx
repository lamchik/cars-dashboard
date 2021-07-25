import React, {useCallback} from 'react'
import "./styles.css"

const getCarLabel = (car) => {
  return `${car.mark} ${car.model}`
}

const Table = ({
 cars,
 tariffs,
 sortOrder,
 changeSortOrder,
 searchQuery,
 chooseCar,
}) => {
  const composeCars = useCallback((cars) => {
    let filteredCars = cars;
    if (searchQuery) {
      filteredCars = cars.filter(car => getCarLabel(car).toLowerCase().includes(searchQuery.toLowerCase()))
    }
    return filteredCars.sort((a, b) => getCarLabel(a) > getCarLabel(b) ? sortOrder : -1 * sortOrder)
  }, [sortOrder, searchQuery])

  const chooseCarHandler = (car, tariff) => {
    chooseCar(car, tariff)
  }

  return (
    <table className="table">
      <thead className="table__head">
      <tr>
        <td onClick={changeSortOrder}
            className={`table__cell table__cell_sortable ${sortOrder === -1 ? "table__cell_sortable_desc" : "table__cell_sortable_asc"}`}>Марка
          и модель
        </td>
        {tariffs.map(tariff => (
          <td key={tariff} className="table__cell">{tariff}</td>
        ))}
      </tr>
      </thead>
      <tbody>
      {composeCars(cars).map(car => (
        <tr key={getCarLabel(car)}>
          <td key={car} className="table__cell">{getCarLabel(car)}</td>
          {tariffs.map(tariff => (
            <td className={`table__cell ${car.tariffs[tariff] && "table__cell_clickable"}`} onClick={() => chooseCarHandler(car, tariff)} key={tariff}>{car.tariffs[tariff] ? car.tariffs[tariff].year : "-"}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
}

export default Table;
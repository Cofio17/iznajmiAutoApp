
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useContext } from "react";
import { useInView } from "framer-motion";
import { SearchContext } from "../../Contexts/SearchContext";
import { apiRequest } from "../../utils/Api/apiService";

export default function CityComponent({ itemData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(true);
  const { searchListData, setSearchListData, setLoading, setHasSearched, setFilterListData, setFiltersContext } = useContext(SearchContext);

  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  const getCars = async () => {
    try {
      setLoading(true);
      const response = await apiRequest("GET", "cars");
      const filteredDataByCity = response.data.filter((car) => {
        return car.location === itemData.title;
      });
      setSearchListData(filteredDataByCity);
      setFilterListData([]);
      setFiltersContext([]);


    } catch (error) {
      console.log(`error fetching data ${error}`);
    }
    finally {
      setLoading(false);

    }
  };

  const handleClick = async () => {
    await getCars();
  }

  return (
    <Link to={`/rent-a-car?City=${encodeURIComponent(itemData.title)}`}>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={hasAnimated ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
        className="section-container-image"
        onClick={handleClick}
      >
        <div className="overlay"></div>
        <p className="text-overlay">{itemData.title}</p>
        <img src={itemData.description} alt="image" loading="lazy" />
      </motion.div>
    </Link>
  );
}

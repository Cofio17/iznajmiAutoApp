import "../style.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useRef, useState, useContext } from "react";
import { useInView } from "framer-motion";
import { SearchContext } from "../Contexts/SearchContext";
import axios from "axios";

export default function CityComponent({ itemData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [hasAnimated, setHasAnimated] = useState(false);
  const { searchListData,setSearchListData, setLoading } = useContext(SearchContext);
  const localhost = import.meta.env.VITE_LOCAL_HOST;


  useEffect(() => {
    if (isInView) {
      setHasAnimated(true);
    }
  }, [isInView]);

  const getCars = async () => {
    try {
        setLoading(true);
      const response = await axios.get(`${localhost}cars`);
      const filteredDataByCity = response.data.data.filter((car) => {
        return car.location === itemData.title;
      });
      setSearchListData(filteredDataByCity);
    } catch (error) {
      console.log(`error fetching data ${error}`);
    }
    finally{
        setLoading(false);
        
    }
  };

  const handleClick = async ()=>{
    await getCars();
  }

  return (
    <Link to={`/cars?City=${encodeURIComponent(itemData.title)}`}>
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
        <img src={itemData.description} alt="image" />
      </motion.div>
    </Link>
  );
}

import React from 'react';
import styles from "../styles/index.module.css";
interface PaginationProps {
   productsPerPage: number;
   totalProducts: number;
   paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ productsPerPage, totalProducts, paginate }) => {
   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <nav
         className={styles.pagination}>
         <ul className="pagination">
            {pageNumbers.map((number) => (
               <li key={number} className="page-item">
                  <a onClick={() => paginate(number)} href="#" className="page-link">
                     {number}
                  </a>
               </li>
            ))}
         </ul>
      </nav>
   );
};

export default Pagination;


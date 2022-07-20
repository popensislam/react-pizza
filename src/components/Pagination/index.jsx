import classes from './pagination.module.scss'
import ReactPaginate from 'react-paginate';
const Pagination = ({ changePage }) => {

    return (
        <ReactPaginate
        className={classes.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={e => changePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;
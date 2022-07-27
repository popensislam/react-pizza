import classes from './pagination.module.scss'
import ReactPaginate from 'react-paginate';

interface PaginationProps {
    changePage: (i: number) => void
}
const Pagination: React.FC<PaginationProps> = ({ changePage }) => {

    return (
        <ReactPaginate
            className={classes.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={e => changePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
        />
    );
}

export default Pagination;
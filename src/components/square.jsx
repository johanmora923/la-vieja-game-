import PropTypes from 'prop-types';



export const Square = ({ children, isSelected, updateBoard, index }) => {
    const classNAme = `square ${isSelected ? 'is-selected' : ''}`
    
    const handleClick = () => {
        updateBoard(index)
    }
    const getColor = (value) => {
        if (value === '×') return 'red';
        if (value === 'o') return 'blue';
        return 'black';
    };
    
    return (
        <div onClick={handleClick} className={classNAme} style={{ color: getColor(children)}}>
            {children}
        </div>
    )
    }
    
    Square.propTypes = {
    children: PropTypes.node,
    isSelected: PropTypes.bool.isRequired,
    updateBoard: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};
export default Square;
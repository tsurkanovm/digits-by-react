export const Results = ({moves}) => {
    return (
        <div className='results'>
            {moves.map((moveItem)=>
                <p key={moveItem.id}>
                    {`${moveItem.move} | ${moveItem.score}`}
                </p>
            )}
        </div>
    )
}
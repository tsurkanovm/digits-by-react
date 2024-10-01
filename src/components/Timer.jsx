export function Timer({time}) {
    return (
        <>
            <section className="challenge">
                <p className="challenge-time">
                    {time} second{time > 1 ? 's' : ''}
                </p>
            </section>
        </>
    )
}
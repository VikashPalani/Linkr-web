
const UserCard = (user) => {

    const{firstName, lastName, photoUrl, age, gender, about, skills} = user?.user;
    return (
    <div>
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                    src= {photoUrl}
                    alt="User Profile" 
                />
            </figure>
            <div className="card-body w-96 h-56">
                <h2 className="card-title">{firstName+" "+lastName}</h2>
                {age && gender && <p>{age+", "+gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-center my-4 mt-4">
                <button className="btn btn-primary">Ignore</button>
                <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default UserCard

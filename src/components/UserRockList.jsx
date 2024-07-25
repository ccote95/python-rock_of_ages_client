import { useEffect } from "react"

export const UserRockList = ({ rocks, fetchRocks }) => {
    const apiUrl = "http://localhost:8000/rocks"
    useEffect(() => {
        fetchRocks()
    }, [])

    const removeRock = async (rock_id) => {
        const response = await fetch(`${apiUrl}/${rock_id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`
            }
        })
        fetchRocks()

    }

    const displayRocks = () => {
        if (rocks && rocks.length) {
            return rocks.map(rock => <div key={`key-${rock.id}`} className="border p-5 border-solid hover:bg-fuchsia-500 hover:text-violet-50 rounded-md border-violet-900 mt-5 bg-slate-50">
                {rock.name} ({rock.type.label}) weighs {rock.weight} kg
                <div>In the collection of {rock.user.first_name} {rock.user.last_name}</div>
                <div>
                    <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => removeRock(rock.id) } >
                        DELETE
                    </button>
                </div>
            </div>)
        }

        return <h3>Loading Rocks...</h3>
    }

    return (
        <>
            <h1 className="text-3xl">Rock List</h1>
            {displayRocks()}
        </>
    )
}

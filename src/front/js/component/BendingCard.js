import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";



export default function BendingCard() {
    const [bending, setBending] = useState([]);
    const { store, actions } = useContext(Context);
    const [liked, setLiked] = useState(false);



    console.log(bending)
    useEffect(() => {
        async function fetchData() {
            const res = await fetch(process.env.BACKEND_URL + "/api/bending_types");
            const data = await res.json();
            setBending(data);
            actions.setItem(data)

        }
        fetchData();
    }, []);


    useEffect(() => {
        if (
            store.favorites.find((x) => {
                for (let i in x) {
                    if (bending[i] && bending[i].name === x[i].name) {
                        return true;
                    }
                }
            })
        ) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [store.favorites]);


    return (
      <div className="d-flex col-10 overflow-auto mt-5 mx-auto cards" >            
            
            {bending.length ? bending.map((bendingType, index) => (
                <div className="card col-1" style={{ width: "30rem" }}>
                    {console.log(bendingType.name, "HERE")}
                    <img src={bendingType.photo} style={{height: "15rem"}} className="card-img-top" />
                    <div className="card-body d-flex justify-content-between">
                       <div className="bard-body-left">
                        <h3 className="card-title d-flex">
                            {bendingType.nation_relation}
                        </h3>
                        <h5 className="card-title">
                            {bendingType.nation_relation_sub}
                        </h5>
                        </div>
                        <div className="cardBottom">
                        <Link
                                to={`/bending_description/` + bending.id}
                                className="btn btn-light text-dark"
                            >
                                Learn More!
                            </Link>
                            <button
                                onClick={() => {
                                    actions.addFavorite(bending);
                                }}
                                className="favorites-button btn btn-light text-dark"
                                style={{
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                  }}
                            >
                                ❤️️
                            </button>
                        </div>
                    </div>
                </div>
            )) : null}
        </div>
    )
  }
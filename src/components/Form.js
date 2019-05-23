import React from "react";

const Form = props => (
    <form onSubmit={props.onChangeSearch}>
        <input type="text" name="name" placeholder="Name..." />
        <button>Search</button>
    </form>
);

export default Form;

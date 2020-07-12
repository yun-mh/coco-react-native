import React from "react";
import { useQuery } from "@apollo/react-hooks";
import PostDetailPresenter from "./PostDetailPresenter";
import { VIEW_POST } from "../../../queries/Main/MainQueries";


export default ({ navigation, route }) => {
    const { loading, error, data, refetch } = useQuery(VIEW_POST, {
        variables: {id: route.params.id },
    });

    return (
        <PostDetailPresenter loading={loading} data={data} />
    );
};

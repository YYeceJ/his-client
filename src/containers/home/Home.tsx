import React, {Component} from "react";
import {getProvinceList} from "../../api";

export interface IHomeProps {

}

export interface IHomeState {
    provinceData: any[];
}

class Home extends Component<IHomeProps, IHomeState> {
    constructor(props: Readonly<IHomeProps>) {
        super(props);
        this.state = {
            provinceData: []
        }
    }

    public componentDidMount() {
        getProvinceList()
            .then((res: any[]) => {
                this.setState(() => ({provinceData: res}));
            })
            .catch((err: any) => {
                console.error(err)
            })
    }

    public render() {
        const {provinceData} = this.state;
        return (
            <section>
                <ul>
                    {
                        provinceData && provinceData.map((data: { provinceId: number; provinceName: string }) => (
                                <li key={data.provinceId}>{data.provinceName}</li>
                            )
                        )
                    }
                </ul>
            </section>
        )
    }
}

export default Home;
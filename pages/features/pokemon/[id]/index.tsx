import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import Loading from "../../../../components/loading";
import {
  getPokemonDetail,
  pokemonDetail,
  updatePokemon,
} from "../pokemonSlice";
import { Button, Checkbox, Form, Input } from "antd";

const PokemonDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const pokemon = useAppSelector(pokemonDetail);
  const [isLoading, setisLoading] = useState(true);
  const [fields, setFields] = useState<any[]>([]);
  const pokemonDetailStatus = useAppSelector(
    (state: any) => state.pokemonsWiki.pokemonDetail.status
  );
  useEffect(() => {
    const { id } = router.query || "";
    if (id)
      switch (pokemonDetailStatus) {
        case "idle":
          dispatch(getPokemonDetail(id));
          break;
        case "loading":
          setisLoading(true);
        case "successed":
          setTimeout(() => {
            setisLoading(false);
          }, 1000);
          break;
        default:
          break;
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemonDetailStatus, dispatch, router.query]);

  const onFinish = (values: any) => {
    dispatch(updatePokemon({ ...{ values: values }, ...{ id: pokemon?.id } }));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setFields([
      {
        name: ["customNameByUser"],
        value: pokemon?.attributes?.customNameByUser,
      },
      { name: ["userNote"], value: pokemon?.attributes?.userNote },
    ]);
  }, [pokemon]);

  return (
    <div className="main">
      {isLoading ? (
        <Loading />
      ) : (
        <Form
          name="Pokemon Detail"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          fields={fields}
        >
          <Form.Item label="Custom name" name="customNameByUser">
            <Input defaultValue={pokemon?.attributes?.name} />
          </Form.Item>

          <Form.Item label="Note" name="userNote">
            <Input defaultValue={pokemon?.attributes?.userNote} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default PokemonDetail;

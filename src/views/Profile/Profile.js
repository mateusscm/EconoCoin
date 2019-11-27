import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TextInput,
  Alert,
  Picker,
  Dimensions
} from "react-native";
import { Form, Item, Label, DatePicker, Button, Spinner } from "native-base";
import Reactotron from "reactotron-react-native";
import MenuButton from "./../../components/MenuButton/MenuButton";
import { theme } from "../../config/_theme";
import { FA, FFS } from "../../Firebase";
import { ScrollView } from "react-native-gesture-handler";
import bg from "./../../assets/img/bg.jpg";

const { width: WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    backgroundColor: theme.palette.backgroundMain
  },
  scroller: {
    flex: 1
  },
  text: {
    fontSize: 30,
    color: theme.palette.txtPrimary
  },
  header: {
    height: 170,
    backgroundColor: theme.palette.secondary,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 0
  },
  profile: {
    flex: 1,
    alignItems: "center",
    paddingTop: 25
  },
  imgView: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  img: {
    height: 120,
    width: WIDTH - 55
  },
  profileText: {
    justifyContent: "center",
    marginBottom: 20
  },
  name: {
    fontSize: 30,
    paddingBottom: 5,
    color: "white",
    textAlign: "left"
  },
  subname: {
    fontSize: 16,
    paddingBottom: 5,
    color: "white",
    textAlign: "left"
  },
  data: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  description: {
    width: "100%",
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0
  },
  description2: {
    width: "45%",
    marginLeft: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginRight: 0,
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#000"
  },
  save: {
    flex: 1
  },
  btnLogout: {
    backgroundColor: "black",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  txtBtn: {
    textTransform: "uppercase",
    color: "white"
  },
  column: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  sexo: {
    color: "black",
    width: "100%"
  }
});

const Profile = props => {
  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [data, setData] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [email, setEmail] = React.useState("");
  const [sexo, setSexo] = React.useState("");
  const [id, setUsrId] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const getUser = async () => {
      const usr = await FA.currentUser;
      const ref = await FFS.collection("users")
        .doc(usr.uid)
        .get();
      if (ref.exists) {
        const u = ref.data();
        setEmail(u.email);
        setFirst(u.first);
        setLast(u.last);
        setSexo(u.sexo);
        setData(u.data);
        setUsrId(u.id);
      }
    };
    getUser();
  }, []);

  const handleChange = async () => {
    setLoading(true);
    await FFS.collection("users")
      .doc(id)
      .update({ email, first, last, data, sexo });
    setLoading(false);
    Alert.alert("Sucesso!", `Alterações feitas, ${first}`);
  };

  // Reactotron.log(sexo, "sexo");
  return (
    <View style={styles.allCont}>
      <MenuButton view="Perfil" navigation={props.navigation} />
      <ScrollView style={styles.scroller}>
        <ImageBackground
          source={bg}
          imageStyle={{ opacity: 0.5 }}
          style={styles.header}
        >
          <View style={styles.profile}>
            <View style={styles.imgView}>
              <Image
                style={styles.img}
                source={require("../../assets/img/kazu.png")}
              />
            </View>
            {/* <View style={styles.profileText}>
              <Text style={styles.name}>{first}</Text>
              
            </View> */}
          </View>
        </ImageBackground>
        <View style={styles.data}>
          <Form>
            <Item stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Nome
              </Label>
              <TextInput
                value={first}
                style={{
                  fontSize: 18,
                  // paddingLeft: 5,
                  paddingVertical: 5,
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#000"
                }}
                onChangeText={first => {
                  setFirst(first);
                }}
              />
            </Item>
            <Item stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Sobrenome
              </Label>
              <TextInput
                value={last}
                style={{
                  fontSize: 18,
                  // paddingLeft: 5,
                  paddingVertical: 5,
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#000"
                }}
                onChangeText={last => {
                  setLast(last);
                }}
              />
            </Item>
            <Item stackedLabel style={styles.description}>
              <Label
                style={{
                  fontSize: 18,
                  paddingLeft: 0,
                  color: "rgba(0, 0, 0, 0.5)"
                }}
              >
                Email
              </Label>
              <TextInput
                editable={false}
                style={{
                  fontSize: 18,
                  // paddingLeft: 5,
                  paddingVertical: 5,
                  width: "100%",
                  borderBottomWidth: 1,
                  borderBottomColor: "#000"
                }}
                value={email}
                onChangeText={email => {
                  setEmail({ email });
                }}
              />
            </Item>
            <View style={styles.column}>
              <Item stackedLabel style={styles.description2}>
                <Label
                  style={{
                    fontSize: 18,
                    paddingLeft: 0,
                    color: "rgba(0, 0, 0, 0.5)"
                  }}
                >
                  Sexo
                </Label>
                <Picker
                  style={styles.sexo}
                  selectedValue={sexo}
                  onValueChange={sexo => setSexo(sexo)}
                >
                  <Picker.Item label="Masculino" value="masculino" />
                  <Picker.Item label="Feminino" value="feminino" />
                </Picker>
              </Item>
              <Item stackedLabel style={styles.description2}>
                <Label
                  style={{
                    fontSize: 18,
                    paddingLeft: 0,
                    color: "rgba(0, 0, 0, 0.5)"
                  }}
                >
                  Nascimento
                </Label>
                <DatePicker
                  defaultDate={new Date(1997, 4, 4)}
                  minimumDate={new Date(1900, 1, 1)}
                  maximumDate={new Date(2001, 1, 1)}
                  locale={"br"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText={data}
                  textStyle={{ color: "black" }}
                  placeHolderTextStyle={{ color: "black" }}
                  onDateChange={data =>
                    setData(data.toISOString().split("T")[0])
                  }
                  disabled={false}
                  style={styles.date}
                />
              </Item>
            </View>
            {/* <Item stackedLabel style={styles.description}>
                <Label
                  style={{
                    fontSize: 18,
                    paddingLeft: 0,
                    color: "rgba(0, 0, 0, 0.5)"
                  }}
                >
                  Senha atual
                </Label>
                <TextInput
                  style={{
                    fontSize: 18,
                    // paddingLeft: 5,
                    paddingVertical: 5,
                    width: "100%"
                  }}
                  secureTextEntry={true}
                  // value={this.state.email}
                />
              </Item>
              <Item stackedLabel style={styles.description}>
                <Label
                  style={{
                    fontSize: 18,
                    paddingLeft: 0,
                    color: "rgba(0, 0, 0, 0.5)"
                  }}
                >
                  Nova Senha
                </Label>
                <TextInput
                  style={{
                    fontSize: 18,
                    // paddingLeft: 5,
                    paddingVertical: 5,
                    width: "100%"
                  }}
                  secureTextEntry={true}
                  // value={this.state.email}
                />
              </Item> */}
            <Button
              full
              style={{
                backgroundColor: theme.palette.button,
                marginVertical: 20
              }}
              onPress={handleChange}
            >
              {loading ? (
                <Spinner style={styles.spinner} color="green" />
              ) : (
                <Text style={styles.txtBtn}>Salvar</Text>
              )}
            </Button>
          </Form>
        </View>
      </ScrollView>
      {/* <View style={styles.save}>
            <TouchableOpacity onPress={this.logout} style={styles.btnLogout}>
              <Text style={{ color: "#fff" }}>Sair</Text>
            </TouchableOpacity>
          </View> */}
    </View>
  );
};

// class Profile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       displayName: ""
//     };
//   }

//   componentDidMount() {
//     const { email, displayName } = FA.currentUser;

//     this.setState({ email, displayName });
//   }

//   render() {
//     return (
//       <View style={styles.allCont}>
//         <MenuButton view="Perfil" navigation={this.props.navigation} />
//         <ScrollView style={styles.scroller}>
//           <ImageBackground
//             source={bg}
//             imageStyle={{ opacity: 0.5 }}
//             style={styles.header}
//           >
//             <View style={styles.profile}>
//               <View style={styles.imgView}>
//                 <Image
//                   style={styles.img}
//                   source={require("../../assets/img/logo.png")}
//                 />
//               </View>
//               <View style={styles.profileText}>
//                 <Text style={styles.name}>{this.state.displayName}</Text>
//                 {/* <Text style={styles.subname}>Ver Perfil</Text> */}
//               </View>
//             </View>
//           </ImageBackground>
//           <View style={styles.data}>
//             <Form>
//               <Item stackedLabel style={styles.description}>
//                 <Label
//                   style={{
//                     fontSize: 18,
//                     paddingLeft: 0,
//                     color: "rgba(0, 0, 0, 0.5)"
//                   }}
//                 >
//                   Nome do usuário
//                 </Label>
//                 <TextInput
//                   value={this.state.displayName}
//                   style={{
//                     fontSize: 18,
//                     // paddingLeft: 5,
//                     paddingVertical: 5,
//                     width: "100%",
//                     borderBottomWidth: 1,
//                     borderBottomColor: "#000"
//                   }}
//                 />
//               </Item>
//               <Item stackedLabel style={styles.description}>
//                 <Label
//                   style={{
//                     fontSize: 18,
//                     paddingLeft: 0,
//                     color: "rgba(0, 0, 0, 0.5)"
//                   }}
//                 >
//                   Email
//                 </Label>
//                 <TextInput
//                   disabled
//                   style={{
//                     fontSize: 18,
//                     // paddingLeft: 5,
//                     paddingVertical: 5,
//                     width: "100%",
//                     borderBottomWidth: 1,
//                     borderBottomColor: "#000"
//                   }}
//                   value={this.state.email}
//                 />
//               </Item>
//               {/* <Item stackedLabel style={styles.description}>
//                 <Label
//                   style={{
//                     fontSize: 18,
//                     paddingLeft: 0,
//                     color: "rgba(0, 0, 0, 0.5)"
//                   }}
//                 >
//                   Senha atual
//                 </Label>
//                 <TextInput
//                   style={{
//                     fontSize: 18,
//                     // paddingLeft: 5,
//                     paddingVertical: 5,
//                     width: "100%"
//                   }}
//                   secureTextEntry={true}
//                   // value={this.state.email}
//                 />
//               </Item>
//               <Item stackedLabel style={styles.description}>
//                 <Label
//                   style={{
//                     fontSize: 18,
//                     paddingLeft: 0,
//                     color: "rgba(0, 0, 0, 0.5)"
//                   }}
//                 >
//                   Nova Senha
//                 </Label>
//                 <TextInput
//                   style={{
//                     fontSize: 18,
//                     // paddingLeft: 5,
//                     paddingVertical: 5,
//                     width: "100%"
//                   }}
//                   secureTextEntry={true}
//                   // value={this.state.email}
//                 />
//               </Item> */}
//               <Button
//                 full
//                 style={{
//                   backgroundColor: theme.palette.button,
//                   marginVertical: 20
//                 }}
//               >
//                 <Text style={styles.txtBtn}>Salvar</Text>
//               </Button>
//             </Form>
//           </View>
//         </ScrollView>
//         {/* <View style={styles.save}>
//             <TouchableOpacity onPress={this.logout} style={styles.btnLogout}>
//               <Text style={{ color: "#fff" }}>Sair</Text>
//             </TouchableOpacity>
//           </View> */}
//       </View>
//     );
//   }
// }

export default Profile;

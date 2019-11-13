import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Item, Label, DatePicker } from 'native-base';

const styles = StyleSheet.create({
  mainTitle: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  description: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 150,
    marginHorizontal: 10,
    zIndex: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default function ChartHeader(props) {
  return (
    <View style={styles.mainTitle}>
      <Item picker stackedLabel style={styles.description}>
        <Label
          style={{
            fontSize: 14,
            paddingLeft: 0,
            color: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          Data Inicial
        </Label>
        <DatePicker
          // defaultDate={new Date(2018, 4, 4)}
          // minimumDate={new Date(2018, 1, 1)}
          // maximumDate={new Date(2018, 12, 31)}
          locale={'pt'}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={'fade'}
          androidMode={'default'}
          placeHolderText={'Data: '}
          textStyle={{ color: 'black' }}
          placeHolderTextStyle={{ color: '#000' }}
          value={props.data_inicial}
          // onDateChange={this.setDate}
          disabled={false}
        />
      </Item>
      <Item picker stackedLabel style={styles.description}>
        <Label
          style={{
            fontSize: 14,
            paddingLeft: 0,
            color: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          Data Final
        </Label>
        <DatePicker
          // defaultDate={new Date(2018, 4, 4)}
          // minimumDate={new Date(2018, 1, 1)}
          // maximumDate={new Date(2018, 12, 31)}
          locale={'pt'}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={'fade'}
          androidMode={'default'}
          placeHolderText={'Data: '}
          textStyle={{ color: 'black' }}
          placeHolderTextStyle={{ color: '#000' }}
          onDateChange={this.setDate}
          disabled={false}
        />
      </Item>
      {/* <TextField
        value={props.data_inicial}
        onChange={e => {
          props.setData_inicial(e.target.value);
        }}
        id="dateIni"
        label="Data inicial"
        type="date"
        style={{ marginRight: "10px" }}
      />
      <TextField
        value={props.data_final}
        onChange={e => {
          props.setData_final(e.target.value);
        }}
        id="dateFin"
        label="Data final"
        type="date"
        InputLabelProps={{
          shrink: true
        }}
      />
      <div>
        <Button
          className={clsx(classes.btn, classes.btn_p)}
          onClick={() => {
            props.get_proc_data();
          }}
          style={{ marginBottom: "5px" }}
          size="small"
        >
          Atualizar informacoes
        </Button>
      </div> */}
    </View>
  );
}

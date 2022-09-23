import { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Colors from "../consts/Colors";
import { BlurView } from "expo-blur";
import { returnDateFormat, getDayDiference } from "../utils/utils";
import PropTypes from "prop-types";
const CreditInfoCard = ({
  isFastMoney,
  creditAmount,
  procent,
  payAmount,
  returnTerm,
}) => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View
      style={[
        styles.card,
        isFastMoney ? styles.fastMoneyFon : styles.longMoneyFon,
        { width: windowWidth * 0.917 },
      ]}
    >
      <View style={[styles.row, { marginBottom: 10 }]}>
        <Text style={styles.title}>Кредитний баланс</Text>
        {isFastMoney && (
          <Image
            style={{ width: 99, height: 13 }}
            source={require("../assets/images/sg_logo.png")}
          />
        )}
        {!isFastMoney && (
          <Image
            style={{ width: 64, height: 13 }}
            source={require("../assets/images/logo_nadovgo.png")}
          />
        )}
      </View>
      <View style={[styles.row, styles.amountWrapper]}>
        <Text style={styles.amount}>{creditAmount} ₴</Text>
        <View
          style={[
            styles.statusWrapper,
            !isFastMoney ? { backgroundColor: Colors.darkGreen } : "",
          ]}
        >
          <Text style={styles.statusText}>Неактивний</Text>
        </View>
      </View>
      <View style={[styles.row, { marginBottom: 5 }]}>
        <Text style={styles.label}>Відсоток</Text>
        <Text style={styles.label}>До оплати</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={styles.value}>{procent} ₴</Text>
        <Text style={styles.value}>{payAmount} ₴</Text>
      </View>
      <View style={[styles.row, { marginBottom: 5, marginTop: "auto" }]}>
        <Text style={styles.label}>Повернути до</Text>
        <Text style={styles.label}>До кінця терміну</Text>
      </View>
      <View style={[styles.row]}>
        <Text style={styles.value}>{returnDateFormat(returnTerm)}</Text>
        <Text style={styles.value}>
          {getDayDiference(returnTerm)}{" "}
          {getDayDiference(returnTerm) === 1
            ? "день"
            : getDayDiference(returnTerm) < 5
            ? "дні"
            : "днів"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    height: 192,
    padding: 16,
    shadowColor: Colors.darkBlue,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    elevation: 5,
  },

  fastMoneyFon: {
    backgroundColor: Colors.darkBlue,
    shadowColor: Colors.darkBlue,
  },

  longMoneyFon: {
    backgroundColor: Colors.lightGreen,
    shadowColor: Colors.lightGreen,
  },

  shadowCard: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: 296,
    height: 16,
    alignSelf: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusWrapper: {
    width: 104,
    height: 23,
    backgroundColor: Colors.blackBlue,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  amountWrapper: {
    paddingBottom: 10,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    marginBottom: 8,
  },

  title: {
    color: Colors.white,
    fontFamily: "Ubuntu_300Light",
    fontSize: 14,
  },

  amount: {
    color: Colors.white,
    fontFamily: "Ubuntu_700Bold",
    fontSize: 20,
  },

  statusText: {
    color: Colors.white,
    fontFamily: "Ubuntu_300Light",
    fontSize: 11,
  },
  label: {
    color: Colors.white,
    fontFamily: "Ubuntu_300Light",
    fontSize: 12,
    opacity: 0.75,
  },

  value: {
    color: Colors.white,
    fontFamily: "Ubuntu_400Regular",
    fontSize: 12,
  },
});

export default CreditInfoCard;

CreditInfoCard.protoTypes = {
  isFastMoney: PropTypes.bool.isRequired,
  creditAmount: PropTypes.number.isRequired,
  procent: PropTypes.number.isRequired,
  payAmount: PropTypes.number.isRequired,
  returnTerm: PropTypes.object.isRequired,
};

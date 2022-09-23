import { useState, useEffect, useLayoutEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import CreditInfoCard from "../components/CreditInfo";
import { Slider } from "@miblanchard/react-native-slider";
import Colors from "../consts/Colors";
import { addDays, returnDateFormat, getDayDiference } from "../utils/utils";

const FAST_MONEY_INITIAL_AMOUNT_VALUES = {
  minValue: 400,
  maxValue: 10000,
  minStep: 200,
  maxStep: 500,
  stepSwitchValue: 1000,
};

const FAST_MONEY_INITIAL_TERM_VALUES = {
  minValue: 3,
  maxValue: 14,
  step: 1,
};

const LONG_MONEY_INITIAL_AMOUNT_VALUES = {
  minValue: 10000,
  maxValue: 30000,
  minStep: 1000,
};

const LONG_MONEY_INITIAL_TERM_VALUES = {
  minValue: 28,
  maxValue: 140,
  step: 14,
};

const FAST_MONEY_VALUE_ARRAY = [400, 600, 800];

for (let i = 1000; i <= 10000; i = i + 500) {
  FAST_MONEY_VALUE_ARRAY.push(i);
}

const MoneyScreen = () => {
  const [isFastMoney, setIsFastMoney] = useState(true);
  const [creditAmount, setCreditAmount] = useState(
    FAST_MONEY_INITIAL_AMOUNT_VALUES.minValue
  );
  const [creditAmountStep, setCreditAmountStep] = useState(
    FAST_MONEY_INITIAL_AMOUNT_VALUES.minStep
  );
  const [creditTerm, setCreditTerm] = useState(
    FAST_MONEY_INITIAL_TERM_VALUES.minValue
  );

  const [procent, setProcent] = useState(0);

  const [returnTerm, setReturnTerm] = useState(
    addDays(FAST_MONEY_INITIAL_TERM_VALUES.minValue)
  );

  const [paySum, setPaySum] = useState(0);

  const windowWidth = Dimensions.get("window").width;
  console.log({ FAST_MONEY_VALUE_ARRAY });
  const onChangeCreditAmountHandler = (value) => {
    setCreditAmountStep(
      value[0] < getMoneyCreditAmountOptions().stepSwitchValue
        ? getMoneyCreditAmountOptions().minStep
        : getMoneyCreditAmountOptions().maxStep
    );
    if (!isFastMoney) {
      setCreditAmount(value[0]);
      return;
    }

    let resultValue = value[0];

    FAST_MONEY_VALUE_ARRAY.forEach((item, index) => {
      if (index === 0) {
        return;
      }
      if (
        resultValue > FAST_MONEY_VALUE_ARRAY[index - 1] &&
        resultValue < item
      ) {
        resultValue = FAST_MONEY_VALUE_ARRAY[index - 1];
      }

      if (resultValue === item) {
        resultValue = item;
      }
    });

    setCreditAmount(resultValue);
  };

  const onChangeTermHandler = (days) => {
    setCreditTerm(days[0]);
    setReturnTerm(addDays(days[0]));
  };

  const getMoneyCreditAmountOptions = () => {
    return isFastMoney
      ? FAST_MONEY_INITIAL_AMOUNT_VALUES
      : LONG_MONEY_INITIAL_AMOUNT_VALUES;
  };

  const getMoneyTermOptions = () => {
    return isFastMoney
      ? FAST_MONEY_INITIAL_TERM_VALUES
      : LONG_MONEY_INITIAL_TERM_VALUES;
  };

  const getInfo = () => {
    return `Крудитний баланс: ${creditAmount}, Відсоток: ${procent}, До сплати: ${paySum}, Повернути до: ${returnDateFormat(
      returnTerm
    )}, До кінця терміну: ${getDayDiference(returnTerm)} ${
      getDayDiference(returnTerm) === 1
        ? "день"
        : getDayDiference(returnTerm) < 5
        ? "дні"
        : "днів"
    }`;
  };

  const showCreditInfo = useCallback(() => {
    Alert.alert("Інформація", getInfo(), [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  }, [isFastMoney, creditAmount, creditTerm, procent]);

  useEffect(() => {
    const resultProcent = (creditAmount / 100) * creditTerm;
    setProcent(resultProcent);
    setPaySum(creditAmount + resultProcent);
  }, [creditAmount, creditTerm]);
  useEffect(() => {
    if (isFastMoney) {
      setCreditAmount(FAST_MONEY_INITIAL_AMOUNT_VALUES.minValue);
      setCreditTerm(FAST_MONEY_INITIAL_TERM_VALUES.minValue);
    }

    if (!isFastMoney) {
      setCreditAmount(LONG_MONEY_INITIAL_AMOUNT_VALUES.minValue);
      setCreditTerm(LONG_MONEY_INITIAL_TERM_VALUES.minValue);
    }
  }, [isFastMoney]);

  useLayoutEffect(() => {}, [creditAmount]);

  return (
    <View style={styles.screen}>
      <StatusBar hidden />
      <Header />
      <ScrollView>
        <View style={styles.content}>
          <View style={styles.buttonWrapper}>
            <View style={styles.switchButtonWrapper}>
              <TouchableOpacity
                onPress={() => setIsFastMoney(!isFastMoney)}
                style={[
                  styles.switchButton,
                  isFastMoney ? styles.switchButtonChecked : "",
                ]}
              >
                <Text
                  style={
                    isFastMoney
                      ? styles.switchButtonTextChecked
                      : styles.switchButtonText
                  }
                >
                  ШвидкоГроші
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setIsFastMoney(!isFastMoney)}
                style={[
                  styles.switchButton,
                  !isFastMoney ? styles.switchButtonChecked : "",
                ]}
              >
                <Text
                  style={
                    !isFastMoney
                      ? styles.switchButtonTextChecked
                      : styles.switchButtonText
                  }
                >
                  НаДовго
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.creditInfoWrapper}>
            <View
              style={[
                styles.fastCardPrev,
                { width: windowWidth * 0.021 },
                isFastMoney ? { backgroundColor: Colors.white } : "",
              ]}
            />
            <CreditInfoCard
              isFastMoney={isFastMoney}
              creditAmount={creditAmount}
              procent={procent}
              payAmount={creditAmount + procent}
              returnTerm={returnTerm}
            />
            <View
              style={[
                styles.longCardPrev,
                { width: windowWidth * 0.021 },
                !isFastMoney ? { backgroundColor: Colors.white } : "",
              ]}
            />
          </View>
          <View style={styles.sliderWrapper}>
            <View style={styles.sliderResultWrapper}>
              <Text style={styles.label}>
                {getMoneyCreditAmountOptions().minValue}
              </Text>
              <View style={styles.amountContainer}>
                <Text style={styles.sum}>Сума кредиту</Text>
                <Text style={styles.amount}>{creditAmount} ₴</Text>
              </View>
              <Text style={styles.label}>
                {getMoneyCreditAmountOptions().maxValue}
              </Text>
            </View>

            <Slider
              value={creditAmount}
              onValueChange={(value) => onChangeCreditAmountHandler(value)}
              animateTransitions
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
              minimumTrackTintColor={Colors.darkBlue}
              step={getMoneyCreditAmountOptions().minStep}
              maximumValue={getMoneyCreditAmountOptions().maxValue}
              minimumValue={getMoneyCreditAmountOptions().minValue}
            />
          </View>
          <View style={[styles.sliderWrapper, { marginBottom: 18 }]}>
            <View style={styles.sliderResultWrapper}>
              <Text style={styles.label}>{getMoneyTermOptions().minValue}</Text>
              <View style={styles.termWrapper}>
                <Text style={styles.sum}>Термін кредиту</Text>
                <Text style={styles.amount}>
                  {creditTerm}{" "}
                  {creditTerm === 1 ? "день" : creditTerm < 5 ? "дні" : "днів"}
                </Text>
              </View>

              <Text style={styles.label}>{getMoneyTermOptions().maxValue}</Text>
            </View>

            <Slider
              value={creditTerm}
              onValueChange={(value) => onChangeTermHandler(value)}
              animateTransitions
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
              minimumTrackTintColor={Colors.darkBlue}
              step={getMoneyTermOptions().step}
              maximumValue={getMoneyTermOptions().maxValue}
              minimumValue={getMoneyTermOptions().minValue}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.confirnButtonWrapper}>
        <TouchableOpacity
          onPress={() => showCreditInfo()}
          style={styles.confirmButton}
        >
          <Text style={styles.confirmText}>ОТРИМАТИ ГРОШІ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    position: "relative",
  },

  buttonWrapper: {
    marginTop: 60,
    paddingHorizontal: 38,
    marginBottom: 20,
  },

  switchButtonWrapper: {
    flexDirection: "row",
    backgroundColor: Colors.darkBlue,
    borderRadius: 20,
    width: "100%",
    height: 32,
    borderColor: Colors.darkBlue,
    borderWidth: 1,
  },

  switchButton: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  switchButtonChecked: {
    backgroundColor: Colors.white,
    borderRadius: 20,
  },

  switchButtonText: {
    color: Colors.white,
    opacity: 0.5,
    fontFamily: "Ubuntu_500Medium",
    fontSize: 12,
  },

  switchButtonTextChecked: {
    color: Colors.darkBlue,
    fontFamily: "Ubuntu_500Medium",
    fontSize: 12,
  },

  creditInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 57,
    width: "100%",
  },

  confirnButtonWrapper: {
    marginTop: "auto",
    paddingHorizontal: 13,
    marginBottom: 15,
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
  },

  confirmButton: {
    backgroundColor: Colors.yellow,
    borderRadius: 25,
    height: 45,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.yellow,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 25,
    elevation: 5,
    marginBottom: 10,
  },

  confirmText: {
    color: Colors.white,
    fontFamily: "Ubuntu_500Medium",
    fontSize: 14,
  },

  sliderWrapper: {
    paddingLeft: 31,
    paddingRight: 32,
  },

  track: {
    backgroundColor: Colors.lightBlue,
    height: 4,
  },

  thumb: {
    borderColor: Colors.lightBlue,
    borderWidth: 6,
    backgroundColor: Colors.white,
    height: 22,
    width: 22,
    borderRadius: 11,
  },

  sum: {
    alignSelf: "center",
    color: Colors.black,
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    opacity: 0.5,
    marginBottom: 5,
  },

  sliderResultWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  label: {
    color: Colors.black,
    fontFamily: "Ubuntu_400Regular",
    fontSize: 13,
    opacity: 0.75,
  },

  amount: {
    color: Colors.darkBlue,
    fontFamily: "Ubuntu_700Bold",
    fontSize: 20,
  },

  amountContainer: {
    paddingHorizontal: 8,
    paddingBottom: 3,
    borderBottomColor: "#00000040",
    borderBottomWidth: 1,
    alignItems: "center",
  },

  content: {
    paddingBottom: 100,
  },

  termWrapper: {
    alignItems: "center",
  },

  longCardPrev: {
    backgroundColor: Colors.lightGreen,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 154,
  },

  fastCardPrev: {
    backgroundColor: Colors.darkBlue,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    height: 154,
  },
});

export default MoneyScreen;

import { View, FlatList } from 'react-native';
import { useState } from 'react';
import { Button, Text, TextInput, Card } from 'react-native-paper';

const HelloWorld = () => {
  // Counter state
  const [count, setCount] = useState(0);
  
  // Dynamic list state
  const [items, setItems] = useState<string[]>([]);
  
  // Text input state
  const [inputText, setInputText] = useState('');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      {/* Counter */}
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <Text variant="headlineMedium">Count: {count}</Text>
        <Button mode="contained" onPress={() => setCount(count + 1)}>
          Increase Count
        </Button>
      </Card>

      {/* Dynamic List */}
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <Button mode="contained" onPress={() => setItems([...items, `Item ${items.length + 1}`])}>
          Add Item
        </Button>
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      </Card>

      {/* Text Input */}
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <TextInput
          label="Type something"
          mode="outlined"
          value={inputText}
          onChangeText={setInputText}
        />
        <Text variant="bodyLarge" style={{ marginTop: 10 }}>{inputText}</Text>
      </Card>
    </View>
  );
};

export default HelloWorld;

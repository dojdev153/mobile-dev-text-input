import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  ScrollView,
  Image,
  Alert,
  Platform,
  Button,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  // Text inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [decimal, setDecimal] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');

  // Radio input (Gender)
  const [gender, setGender] = useState('Male');

  // Dropdown Picker (Course)
  const [course, setCourse] = useState('React Native');

  // Slider (Experience level 1 - 10)
  const [experience, setExperience] = useState(5);

  // Date and Time Pickers
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Camera & Image upload
  const [imageUri, setImageUri] = useState(null);

  // File / Document upload
  const [selectedFile, setSelectedFile] = useState(null);

  // Multi-select Checkboxes (Skills)
  const [selectedSkills, setSelectedSkills] = useState([]);
  const skills = ['JavaScript', 'Python', 'React Native', 'Flutter'];

  // Switches and Checkboxes
  const [notifications, setNotifications] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  function selectSkill(skill) {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(item => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  }

  // Open Camera
  async function openCamera() {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permission is required to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  }

  // Pick Image from Gallery
  async function pickImageFromGallery() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Media library permission is required to choose photos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  }

  // Upload File / Document
  async function pickDocument() {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document: ' + error.message);
    }
  }

  function onDateChange(event, selectedDate) {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  }

  function onTimeChange(event, selectedTime) {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
  }

  function submitForm() {
    const formData = {
      name,
      email,
      password,
      phone,
      age,
      decimal,
      website,
      description,
      gender,
      course,
      experience,
      date: date.toISOString().split('T')[0],
      time: time.toTimeString().split(' ')[0],
      imageUri,
      file: selectedFile ? { name: selectedFile.name, size: selectedFile.size, uri: selectedFile.uri } : null,
      selectedSkills,
      notifications,
      agreeTerms,
    };

    console.log('Form Data:');
    console.log(JSON.stringify(formData, null, 2));
    Alert.alert('Form Submitted', 'Data logged to console successfully!');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>React Native Forms</Text>

      {/* 1. Text Inputs */}
      <Text style={styles.heading}>Text Inputs</Text>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Text>Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text>Age (numeric keyboard)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter age"
        keyboardType="number-pad"
        value={age}
        onChangeText={setAge}
      />

      <Text>Decimal Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a decimal"
        keyboardType="decimal-pad"
        value={decimal}
        onChangeText={setDecimal}
      />

      <Text>Website URL</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter website"
        keyboardType="url"
        autoCapitalize="none"
        value={website}
        onChangeText={setWebsite}
      />

      <Text>Description (multiline)</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Tell us about yourself"
        multiline={true}
        value={description}
        onChangeText={setDescription}
      />

      {/* 2. Radio Buttons */}
      <Text style={styles.heading}>Gender (Radio Buttons)</Text>
      <View style={styles.row}>
        {['Male', 'Female', 'Other'].map(item => (
          <Pressable
            key={item}
            style={styles.option}
            onPress={() => setGender(item)}
          >
            <Text>
              {gender === item ? '(X)' : '( )'} {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* 3. Dropdown Picker */}
      <Text style={styles.heading}>Select Course (Dropdown Picker)</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={course}
          onValueChange={itemValue => setCourse(itemValue)}
        >
          <Picker.Item label="React Native" value="React Native" />
          <Picker.Item label="Flutter" value="Flutter" />
          <Picker.Item label="Web Development" value="Web Development" />
          <Picker.Item label="Data Science" value="Data Science" />
        </Picker>
      </View>

      {/* 4. Slider */}
      <Text style={styles.heading}>Experience Level: {Math.round(experience)} / 10</Text>
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={experience}
        onValueChange={setExperience}
      />

      {/* 5. Date & Time Pickers */}
      <Text style={styles.heading}>Date & Time</Text>
      <Text>Selected Date: {date.toLocaleDateString()}</Text>
      <View style={styles.buttonPadding}>
        <Button title="Pick Date" onPress={() => setShowDatePicker(true)} />
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      <Text>Selected Time: {time.toLocaleTimeString()}</Text>
      <View style={styles.buttonPadding}>
        <Button title="Pick Time" onPress={() => setShowTimePicker(true)} />
      </View>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={onTimeChange}
        />
      )}

      {/* 6. Camera & Image Picker */}
      <Text style={styles.heading}>Camera & Photos</Text>
      <View style={styles.buttonPadding}>
        <Button title="Open Camera & Take Photo" onPress={openCamera} />
      </View>
      <View style={styles.buttonPadding}>
        <Button title="Pick Image from Gallery" onPress={pickImageFromGallery} />
      </View>
      {imageUri && (
        <View style={styles.previewContainer}>
          <Text>Photo Preview:</Text>
          <Image source={{ uri: imageUri }} style={styles.previewImage} />
        </View>
      )}

      {/* 7. File / Document Upload */}
      <Text style={styles.heading}>Upload File / Document</Text>
      <View style={styles.buttonPadding}>
        <Button title="Upload File" onPress={pickDocument} />
      </View>
      {selectedFile && (
        <View style={styles.fileInfo}>
          <Text>File Name: {selectedFile.name}</Text>
          <Text>File Size: {selectedFile.size ? (selectedFile.size / 1024).toFixed(1) + ' KB' : 'Unknown'}</Text>
          <Text>MIME Type: {selectedFile.mimeType || 'Unknown'}</Text>
        </View>
      )}

      {/* 8. Multi-select Checkboxes */}
      <Text style={styles.heading}>Select Your Skills (Checkboxes)</Text>
      <Text>Press a skill to select or deselect it.</Text>
      {skills.map(item => (
        <Pressable
          key={item}
          style={styles.skill}
          onPress={() => selectSkill(item)}
        >
          <Text>
            {selectedSkills.includes(item) ? '[X]' : '[ ]'} {item}
          </Text>
        </Pressable>
      ))}

      {/* 9. Switches & Agreement */}
      <View style={styles.switchRow}>
        <Text>Receive Notifications</Text>
        <Switch
          value={notifications}
          onValueChange={setNotifications}
        />
      </View>

      <Pressable
        style={styles.checkboxRow}
        onPress={() => setAgreeTerms(!agreeTerms)}
      >
        <Text>
          {agreeTerms ? '[X]' : '[ ]'} I agree to the Terms and Conditions
        </Text>
      </Pressable>

      {/* 10. Submit Button */}
      <View style={styles.submitContainer}>
        <Pressable
          style={styles.button}
          onPress={submitForm}
        >
          <Text style={styles.buttonText}>Submit Form</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 12,
  },

  multiline: {
    height: 80,
    textAlignVertical: 'top',
  },

  row: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 5,
    marginBottom: 12,
  },

  option: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 12,
  },

  slider: {
    width: '100%',
    height: 40,
    marginBottom: 12,
  },

  buttonPadding: {
    paddingVertical: 5,
  },

  previewContainer: {
    paddingVertical: 10,
  },

  previewImage: {
    width: 150,
    height: 150,
    marginTop: 8,
    borderRadius: 5,
  },

  fileInfo: {
    paddingVertical: 8,
  },

  skill: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 12,
    marginTop: 8,
  },

  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },

  checkboxRow: {
    paddingVertical: 8,
    marginBottom: 20,
  },

  submitContainer: {
    marginTop: 10,
  },

  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

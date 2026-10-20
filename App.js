
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');

  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('React Native');
  const [notifications, setNotifications] = useState(false);
  const [skills, setSkills] = useState([]);

  function selectSkill(skill) {
    if (skills.includes(skill)) {
      setSkills(skills.filter(item => item !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  }

  function submitForm() {
    const formData = {
      name,
      email,
      password,
      phone,
      age,
      description,
      gender,
      course,
      notifications,
      skills,
    };

    console.log('Form Data:', JSON.stringify(formData, null, 2));
    console.log(formData);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Registration Form</Text>
      <Text style={styles.subtitle}>
        Enter your details below
      </Text>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.heading}>Personal Information</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.description]}
          placeholder="Tell us about yourself"
          multiline={true}
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Course and Preferences */}
      <View style={styles.section}>
        <Text style={styles.heading}>Course and Preferences</Text>

        <Text style={styles.label}>Gender</Text>

        <View style={styles.options}>
          <Pressable
            style={styles.option}
            onPress={() => setGender('Male')}
          >
            <Text>{gender === 'Male' ? '(X)' : '( )'} Male</Text>
          </Pressable>

          <Pressable
            style={styles.option}
            onPress={() => setGender('Female')}
          >
            <Text>{gender === 'Female' ? '(X)' : '( )'} Female</Text>
          </Pressable>
        </View>

        <Text style={styles.label}>Select Course</Text>
        <View style={styles.pickerBorder}>
          <Picker
            selectedValue={course}
            onValueChange={setCourse}
          >
            <Picker.Item label="React Native" value="React Native" />
            <Picker.Item label="Flutter" value="Flutter" />
            <Picker.Item label="Web Development" value="Web Development" />
          </Picker>
        </View>

        <Text style={styles.label}>Select Skills</Text>

        {['JavaScript', 'Python', 'Flutter'].map(skill => (
          <Pressable
            key={skill}
            style={styles.skill}
            onPress={() => selectSkill(skill)}
          >
            <Text>
              {skills.includes(skill) ? '[X]' : '[ ]'} {skill}
            </Text>
          </Pressable>
        ))}

        <View style={styles.switchRow}>
          <Text style={styles.label}>Receive Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>
      </View>

      {/* Submit */}
      <Pressable style={styles.submitButton} onPress={submitForm}>
        <Text style={styles.submitText}>Submit Form</Text>
      </Pressable>

      <Text style={styles.footer}>
        Check your details before submitting.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  subtitle: {
    marginBottom: 20,
    color: 'gray',
  },

  section: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },

  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
    marginTop: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
  },

  description: {
    height: 80,
    textAlignVertical: 'top',
  },

  options: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 10,
  },

  option: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
  },

  pickerBorder: {
    borderWidth: 1,
    borderColor: '#aaaaaa',
    borderRadius: 5,
    marginBottom: 10,
  },

  skill: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
  },

  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  submitButton: {
    backgroundColor: '#2463eb',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },

  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  footer: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 15,
  },
});

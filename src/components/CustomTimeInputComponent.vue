<script>
export default {
  name: 'CustomTimeInputComponent',
  props: {
    modelValue: {
      type: String,
      required: true,
      default: '00:00'
    },
    minTime: {
      type: String,
      required: false,
      default: '00:00'
    },
    maxTime: {
      type: String,
      required: false,
      default: '23:59'
    },
    step: {
      type: Number,
      required: false,
      default: 5
    },
    restrictEndHour: {
      type: Boolean,
      required: false,
      default: false
    },
    maxStartMinutes: {
      type: Number,
      required: false,
      default: 60
    }
  },
  data() {
    const [hours, minutes] = this.modelValue.split(':').map(Number)
    return {
      hours: hours !== undefined ? hours.toString().padStart(2, '0') : '00',
      minutes: minutes !== undefined ? minutes.toString().padStart(2, '0') : '00'
    }
  },
  computed: {
    hourOptions() {
      const [minHour] = this.minTime.split(':').map(Number)
      const [maxHour] = this.maxTime.split(':').map(Number)
      const hours = []
      for (let h = minHour; h <= maxHour; h++) {
        hours.push(h.toString().padStart(2, '0'))
      }
      return hours
    },
    minuteOptions() {
      const minutes = []
      for (let m = 0; m < 60; m += this.step) {
        minutes.push(m.toString().padStart(2, '0'))
      }
      return minutes
    },
    filteredHourOptions() {
      const minHour = parseInt(this.minTime.split(':')[0])
      const maxHour = parseInt(this.maxTime.split(':')[0])
      return this.hourOptions.filter((hour) => {
        const hourInt = parseInt(hour)
        return hourInt >= minHour && hourInt <= maxHour
      })
    },
    filteredMinuteOptions() {
      const minMinutes = parseInt(this.minTime.split(':')[1])
      const maxMinutes = this.maxStartMinutes
      const hourInt = parseInt(this.hours)
      if (this.restrictEndHour && hourInt === parseInt(this.maxTime.split(':')[0])) {
        return ['00']
      }
      if (hourInt === parseInt(this.minTime.split(':')[0])) {
        return this.minuteOptions.filter((minute) => parseInt(minute) >= minMinutes)
      }
      if (hourInt === parseInt(this.maxTime.split(':')[0])) {
        return this.minuteOptions.filter((minute) => parseInt(minute) <= maxMinutes)
      }
      return this.minuteOptions
    }
  },
  watch: {
    modelValue(newVal) {
      const [hours, minutes] = newVal.split(':').map(Number)
      this.hours = hours.toString().padStart(2, '0')
      this.minutes = minutes.toString().padStart(2, '0')
    }
  },
  methods: {
    updateTime() {
      const newTime = `${this.hours}:${this.minutes}`
      this.$emit('update:modelValue', newTime)
    }
  }
}
</script>

<template>
  <div class="time-input">
    <select v-model="hours" @change="updateTime">
      <option v-for="hour in filteredHourOptions" :key="hour" :value="hour">{{ hour }}</option>
    </select>
    :
    <select v-model="minutes" @change="updateTime">
      <option v-for="minute in filteredMinuteOptions" :key="minute" :value="minute">
        {{ minute }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.time-input {
  display: flex;
  align-items: center;
}

select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px 10px;
  font-size: 16px;
  margin: 0 2px;
}
</style>
